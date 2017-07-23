import { Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Auth, Conf, Rpc } from 'react-native-qiniu';

Conf.ACCESS_KEY = '6zccBym_5ajLhGF1X-r1EGs_QFAqQJOrGe9o4N76';
Conf.SECRET_KEY = '7YO_Iz0vZklV0Z7xIBETyaF199_DI8qNo4wFu3sd';
const BUKET = 'symphony-dev';

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

const ImgUpload = {
    IMG_HOST: 'http://7xjz0r.com1.z0.glb.clouddn.com',
    imgPick() {
        return new Promise((resolve, reject) => {
            ImagePicker.showImagePicker(options, (response) => {
                console.log('Response = ', response);
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                    reject();
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                    reject();
                    // } else if (response.customButton) {
                    //     console.log('User tapped custom button: ', response.customButton);
                } else {
                    resolve(response);
                }
            });
        });
    },
    upload() {
        const me = this;
        return new Promise((resolve, reject) => {
            me.imgPick().then((response) => {
                let source;
                if (Platform.OS === 'android') {
                    source = { uri: response.uri, isStatic: true };
                } else {
                    source = { uri: response.uri.replace('file://', ''), isStatic: true };
                }

                const putPolicy = new Auth.PutPolicy2(
                    { scope: `${BUKET}:${response.fileName}` }
                );
                const uptoken = putPolicy.token();
                const formInput = {
                    key: response.fileName
                    // formInput对象如何配置请参考七牛官方文档“直传文件”一节
                };
                Rpc.uploadFile(source.uri, uptoken, formInput).then((res) => {
                    console.log('upload success');
                    resolve(res);
                }).catch((e) => {
                    console.log(e);
                    reject(e);
                });
            });
        });
    }
};


export default ImgUpload;
