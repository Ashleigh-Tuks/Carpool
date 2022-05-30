/* eslint-disable-next-line */
import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '@carpool/client/shared/utilities';

type props = {
  onPress: () => void;
};

const { blue, black, white } = colors;

export function HomeOptionBox({ onPress }: props) {
  return (
    <View style={[styles.absoluteBox, styles.shadow]}>
      <View
        style={{
          paddingBottom: 10,
        }}
      >
        <Text style={styles.smallText}>What do you want to do?</Text>
      </View>
      <Pressable style={styles.optionButton} onPress={onPress}>
        <Icons name="directions-run" size={20} style={styles.iconStyle} />
        <Text style={styles.bigText}>Find a Trip</Text>
      </Pressable>
      <Pressable style={[styles.optionButton, { marginBottom: 0 }]}>
        <Icons name="directions-car" size={20} style={styles.iconStyle} />
        <Text style={styles.bigText}>Create a Trip</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  absoluteBox: {
    backgroundColor: blue,
    flex: 0.65,
    marginTop: '-24%',
    borderRadius: 15,
    marginHorizontal: 20,
    padding: 15,
  },
  smallText: {
    textAlign: 'center',
    color: white,
    fontWeight: '700',
  },
  optionButton: {
    paddingVertical: 0,
    paddingHorizontal: 15,
    backgroundColor: white,
    borderRadius: 25,
    flex: 2,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigText: {
    textAlign: 'center',
    color: blue,
    fontWeight: '600',
    fontSize: 18,
  },
  iconStyle: {
    paddingRight: 10,
    color: blue,
  },
});

export default HomeOptionBox;
