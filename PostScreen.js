// PostScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, Image, Alert } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { auth, firestore, storage } from './firebase';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const PostScreen = ({ navigation }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissions Required',
          'Sorry, we need camera roll permissions to make this work!'
        );
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      Alert.alert('Image selection was canceled');
    }
  };

  const uploadImage = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const imageName = `${auth.currentUser.uid}_${new Date().getTime()}`;
      const storageRef = ref(storage, `images/${imageName}`);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      console.log('Image uploaded successfully:', downloadURL);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      console.error('Error payload:', error.payload);
      throw error;
    }
  };

  const handlePost = async () => {
    const userId = auth.currentUser.uid;

    let imageUrl = '';
    if (image) {
      try {
        imageUrl = await uploadImage(image);
      } catch (error) {
        setMessage('Failed to upload image.');
        return;
      }
    }

    const postData = {
      userId,
      text,
      image: imageUrl,
      likes: [],
      createdAt: new Date(),
    };

    try {
      await addDoc(collection(firestore, 'posts'), postData);
      setMessage('Post created successfully!');
      setText('');
      setImage(null);
    } catch (error) {
      console.error('Error creating post:', error);
      setMessage('Failed to create post.');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="What's on your mind?"
        value={text}
        onChangeText={setText}
      />
      <Button title="Pick an image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Post" onPress={handlePost} />
      {message ? <Text>{message}</Text> : null}
    </View>
  );
};

export default PostScreen;
