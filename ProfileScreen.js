// ProfileScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, firestore } from './firebase';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [message, setMessage] = useState('');

  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (userId) {
      const fetchUserProfile = async () => {
        const docRef = doc(firestore, 'users', userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name);
          setBio(data.bio);
        } else {
          console.log('No such document!');
        }
      };
      fetchUserProfile();
    }
  }, [userId]);

  const handleSave = async () => {
    if (userId) {
      await setDoc(doc(firestore, 'users', userId), {
        name,
        bio,
      });
      setMessage('Profile updated successfully!');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
      />
      <Button title="Save" onPress={handleSave} />
      {message ? <Text>{message}</Text> : null}
    </View>
  );
};

export default ProfileScreen;
