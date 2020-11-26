import React from 'react';

import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import {Title} from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import styles from './styles';

const Secao = ({ secao, hasTopBorder}) => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>

    {hasTopBorder && <View style={styles.borderTop}/>}

  <Title style={styles.secaoTitle}>{secao[0]?.generos[0]}</Title>

      <FlatList
      style={styles.lista}
        horizontal
        data={secao}
        renderItem={({item, index}) => (
          <TouchableOpacity
          onPress={() => navigation.navigate('Filme', {filme: item, secao})}
          key={index}>
            <ImageBackground
              style={[styles.capa, { marginRight: 10, marginLeft: index == 0 ? 20 : 0 }]}
              source={{
                uri: item.capa,
              }}>
              <Image
              resizeMode='contain'
                style={styles.logo}
                source={{uri: item.logo}}
              />
            </ImageBackground>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Secao;
