'use strict'

import { NativeModules, StatusBar, Platform } from 'react-native';

const { ImagePickerManager } = NativeModules;

const DEFAULT_OPTIONS = {
  title: 'Select a Photo',
  cancelButtonTitle: 'Cancel',
  takePhotoButtonTitle: 'Take Photo…',
  chooseFromLibraryButtonTitle: 'Choose from Library…',
  quality: 1.0,
  allowsEditing: false,
  permissionDenied: {
    title: 'Permission denied',
    text: 'To be able to take pictures with your camera and choose images from your library.',
    reTryTitle: 're-try',
    okTitle: 'I\'m sure',
  }
};

class ImagePicker {

    willPresent( statusBarInfo ) {
        console.log( "statusBarInfo", statusBarInfo );

        if (statusBarInfo.barStyle !== 'default') {
            setTimeout(() => {
                StatusBar.setBarStyle('default', true);
            }, 350);
        }
    }

    didDismiss( statusBarInfo ) {
        console.log( "statusBarInfo", statusBarInfo );

        if (statusBarInfo.barStyle !== 'default') {
            StatusBar.setBarStyle('light-content', true);
        }
    }

    launchCamera(options, callback) {

        if (typeof options === 'function') {
            callback = options;
            options = {};
        }

        let statusBarInfo = {
            barStyle: StatusBar.barStyle,
            backgroundColor: StatusBar.backgroundColor
        };

        let handler = (response) => {
            this.didDismiss(statusBarInfo);

            if (typeof callback === 'function') {
                callback.apply(this, [response]);
            }
        };

        this.willPresent( statusBarInfo );

        return ImagePickerManager.launchCamera({...DEFAULT_OPTIONS, ...options}, handler);
    }

    launchImageLibrary(options, callback) {

        if (typeof options === 'function') {
            callback = options;
            options = {};
        }

        let statusBarInfo = {
            barStyle: StatusBar.barStyle,
            backgroundColor: StatusBar.backgroundColor
        };

        let handler = (response) => {
            this.didDismiss(statusBarInfo);

            if (typeof callback === 'function') {
                callback.apply(this, [response]);
            }
        };

        this.willPresent( statusBarInfo );

        return ImagePickerManager.launchImageLibrary({...DEFAULT_OPTIONS, ...options}, handler);
    }

    showImagePicker(options, callback) {


        if (typeof options === 'function') {
            callback = options;
            options = {};
        }

        let statusBarInfo = {
            barStyle: StatusBar.barStyle,
            backgroundColor: StatusBar.backgroundColor
        };

        let handler = (response) => {
            this.didDismiss(statusBarInfo);

            if (typeof callback === 'function') {
                callback.apply(this, [response]);
            }
        };

        this.willPresent( statusBarInfo );

        return ImagePickerManager.showImagePicker({...DEFAULT_OPTIONS, ...options}, handler);
    }
}

module.exports = new ImagePicker();
