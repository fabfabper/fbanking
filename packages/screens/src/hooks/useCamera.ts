import { Platform, Alert } from "react-native";

const isWeb = Platform.OS === "web";

export const useCamera = () => {
  const openCamera = async () => {
    if (isWeb) {
      // Web: Use HTML input to access camera
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.capture = 'environment' as any; // Use rear camera on mobile browsers
      input.onchange = (e: any) => {
        const file = e.target?.files?.[0];
        if (file) {
          Alert.alert('Photo Captured', `File: ${file.name}`);
          // Here you can process the image file
          return file;
        }
      };
      input.click();
    } else {
      // Mobile: Use expo-image-picker
      try {
        const ImagePicker = await import('expo-image-picker');
        
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Camera permission is required to take photos.');
          return null;
        }

        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
          Alert.alert('Photo Captured', 'Photo taken successfully!');
          return result.assets[0];
        }
      } catch (error) {
        console.error('Camera error:', error);
        Alert.alert('Error', 'Failed to open camera');
      }
    }
    
    return null;
  };

  return { openCamera };
};
