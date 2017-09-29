import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions
} from 'react-native';

import { UIStyleguide } from './UIStyleguide'

var width = Dimensions.get('window').width;

export const UIStyles = StyleSheet.create({
  colorPrimary: {
    color: UIStyleguide.color.primary
  },
  colorAccent: {
    color: UIStyleguide.color.accent
  },
  colorBlack: {
    color: UIStyleguide.color.black
  },
  colorWhite: {
    color: UIStyleguide.color.white
  },
  textCenter: {
    textAlign: 'center'
  },
  window: {
    flex: 1,
    paddingTop: UIStyleguide.spacing,
    paddingBottom: UIStyleguide.spacing*2,
  },
  screen: {
    flex: 1,
    flexDirection: 'column',
    padding: UIStyleguide.spacing,
  },
  backgroundAccent: {
    backgroundColor: UIStyleguide.color.accent,
  },
  backgroundWhite: {
    backgroundColor: UIStyleguide.color.white,
  },
  backgroundBlack: {
    backgroundColor: UIStyleguide.color.black,
  },
  backgroundPrimary: {
    backgroundColor: UIStyleguide.color.primary,
  },
  buttonPrimary: {
    paddingHorizontal: UIStyleguide.spacing*2,
    paddingVertical: UIStyleguide.spacing/1.5,
    backgroundColor: UIStyleguide.color.primary,
    marginBottom: UIStyleguide.spacing,
    width: width * .8,
    borderRadius: UIStyleguide.spacing,
  },
  buttonWhite: {
    paddingHorizontal: UIStyleguide.spacing*2,
    paddingVertical: UIStyleguide.spacing/1.5,
    backgroundColor: UIStyleguide.color.white,
    marginBottom: UIStyleguide.spacing,
    borderRadius: UIStyleguide.spacing,
  },
  buttonBlack: {
    paddingHorizontal: UIStyleguide.spacing*2,
    paddingVertical: UIStyleguide.spacing/1.5,
    backgroundColor: UIStyleguide.color.black,
    marginBottom: UIStyleguide.spacing,
    borderRadius: UIStyleguide.spacing,
  },
  buttonAccent: {
    paddingHorizontal: UIStyleguide.spacing*2,
    paddingVertical: UIStyleguide.spacing/1.5,
    backgroundColor: UIStyleguide.color.accent,
    marginBottom: UIStyleguide.spacing,
    borderRadius: UIStyleguide.spacing,
  },
  largeTitle: {
    marginBottom: UIStyleguide.spacing,
    fontSize: 60,
  },
  title: {
    marginBottom: UIStyleguide.spacing,
    fontSize: 35,
  },
  subTitle: {
    fontWeight: 'bold',
    marginBottom: UIStyleguide.spacing,
  },
  ListItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#DCDCDC',
    borderBottomWidth: 1,
    borderTopColor: '#F0F0F0',
    borderTopWidth: 1,
    paddingVertical: UIStyleguide.spacing,
  },
  ListItemInner: {
    width: width * .8,
  },
  ListItemTitle: {
    color: UIStyleguide.color.black,
    marginBottom: UIStyleguide.spacing/4,
  },
  ListItemSubTitle: {
    fontWeight: 'bold',
    fontSize: 35,
    color: UIStyleguide.color.black,
  },
  spaceSM: {
    marginBottom: UIStyleguide.spacing*2,
  },
  space: {
    marginBottom: UIStyleguide.spacing*4,
  },
  InputNumber: {
    textAlign: 'center',
    color: '#fff',
    borderWidth: 0,
    fontSize: 35,
    marginVertical: UIStyleguide.spacing*0.5,
    marginBottom: UIStyleguide.spacing,
    padding: UIStyleguide.spacing,
  },
});
