import { Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Auth, Conf, Rpc } from 'react-native-qiniu';

import { qiniu } from '../config/symphony';

Conf.ACCESS_KEY = qiniu.accessKey;
Conf.SECRET_KEY = qiniu.secretKey;

const genUUID = () => {
  const date = new Date().getTime();

  let ret = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.floor((date + (Math.random() * 16)) % 16);
    return (c === 'x' ? r : (r % 4) + 8).toString(16);
  });

  ret = ret.replace(new RegExp('-', 'g'), '');
  return ret;
};

const ImgUpload = {
  upload() {
    const options = {
      title: '选择图片',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '图片库',
      cameraType: 'back',
      mediaType: 'photo',
      videoQuality: 'high',
      durationLimit: 10,
      maxWidth: 600,
      maxHeight: 600,
      aspectX: 2,
      aspectY: 1,
      quality: 0.8,
      angle: 0,
      allowsEditing: false,
      noData: false,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    return new Promise((resolve, reject) => {
      ImagePicker.showImagePicker(options, (response) => {
        if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.uri) {
          let source = { uri: response.uri, isStatic: true };
          if (Platform.OS !== 'android') {
            source = { uri: response.uri.replace('file://', ''), isStatic: true };
          }

          const date = new Date();
          const filelName = `file/${date.getFullYear()}/${date.getMonth() + 1}/${genUUID()}-image.${response.fileName.split('.')[1]}`;

          const putPolicy = new Auth.PutPolicy2(
            { scope: `${qiniu.bucket}:${filelName}` }
          );

          Rpc.uploadFile(source.uri, putPolicy.token(), {
            key: filelName
          }).then((res) => {
            resolve(res);
          }).catch((e) => {
            reject(e);
          });
        }
      });
    });
  }
};

export default ImgUpload;
