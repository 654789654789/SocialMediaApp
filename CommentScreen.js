// CommentScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, FlatList } from 'react-native';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { auth, firestore } from './firebase';

const CommentScreen = ({ route }) => {
  const { postId } = route.params;
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const q = query(collection(firestore, 'posts', postId, 'comments'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const commentsData = [];
      querySnapshot.forEach((doc) => {
        commentsData.push({ ...doc.data(), id: doc.id });
      });
      setComments(commentsData);
    });

    return () => unsubscribe();
  }, [postId]);

  const handleComment = async () => {
    const userId = auth.currentUser.uid;
    const commentData = {
      userId,
      text: comment,
      createdAt: new Date(),
    };

    try {
      await addDoc(collection(firestore, 'posts', postId, 'comments'), commentData);
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.text}</Text>
    </View>
  );

  return (
    <View>
      <TextInput
        placeholder="Add a comment..."
        value={comment}
        onChangeText={setComment}
      />
      <Button title="Comment" onPress={handleComment} />
      <FlatList
        data={comments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default CommentScreen;
