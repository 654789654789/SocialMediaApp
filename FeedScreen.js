// FeedScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, Button } from 'react-native';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { auth, firestore } from './firebase';

const FeedScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(firestore, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsData = [];
      querySnapshot.forEach((doc) => {
        postsData.push({ ...doc.data(), id: doc.id });
      });
      setPosts(postsData);
    });

    return () => unsubscribe();
  }, []);

  const handleLike = async (postId, isLiked) => {
    const userId = auth.currentUser.uid;
    const postRef = doc(firestore, 'posts', postId);

    try {
      if (isLiked) {
        await updateDoc(postRef, {
          likes: arrayRemove(userId)
        });
      } else {
        await updateDoc(postRef, {
          likes: arrayUnion(userId)
        });
      }
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  const renderItem = ({ item }) => {
    const isLiked = item.likes.includes(auth.currentUser.uid);
    return (
      <View>
        <Text>{item.text}</Text>
        {item.image && <Image source={{ uri: item.image }} style={{ width: 200, height: 200 }} />}
        <Button
          title={isLiked ? `Unlike (${item.likes.length})` : `Like (${item.likes.length})`}
          onPress={() => handleLike(item.id, isLiked)}
        />
        <Button
          title="Comment"
          onPress={() => navigation.navigate('Comments', { postId: item.id })}
        />
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default FeedScreen;
