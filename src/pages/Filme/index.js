import React, {useState, useEffect} from 'react';
import Secao from '../../components/Secao';
import api from '../../services/api';

import { SinglePickerMaterialDialog } from 'react-native-material-dialog';
import ButtonVertical from '../../components/ButtonVertical';
import Episodeo from '../../components/Episodeo';
import styles from './styles';

import {
  Text,
  ScrollView,
  ImageBackground,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Title, Button, Paragraph, Caption} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';

const Filme = ({ route, navigation }) => {

  const {filme, secao} = route.params;
  const [tipo] = useState('serie');
  const [visible, setVisible] = useState(false);
  const [temporada, setTemporada] = useState({
    value: filme.temporadas[0]?._id,
    label: filme.temporadas[0]?.titulo,
  });
  const [episodeos, setEpisodeos] = useState([]);
  
  const getEpisodeos = async (temporada_id) => {
    try {
      const response = await api.get(`/episodeo/temporada/${temporada_id}`);
      const res = response.data;

      if (res.error) {
        alert(res.message);
        return false;
      }
      setEpisodeos(res.episodeos);
    } catch (err) {
      alert(err.message);
    }
  }

  useEffect(() => {
    if (filme.tipo === "serie") {
      getEpisodeos(temporada.value);
    }
  }, []);
  
  return (
    
    <>
    <SinglePickerMaterialDialog
  title={`${filme.titulo} - Temporadas`}
  items={filme?.temporadas.map(temporada => ({
    value: temporada._id, 
    label: temporada.titulo 
  }))}
  onCancel={() => {
    setVisible(false);
  }}
  visible={visible}
  selectedItem={temporada}
  onOk={result => {
    getEpisodeos(result.selectedItem.value);
    setVisible(false);
    setTemporada(result.selectedItem);
  }}
/>
    <ScrollView style={styles.container}>
      <ImageBackground
        source={{uri: filme.capa}}
        style={styles.hero}>
          <TouchableOpacity 
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.buttonBack}>
            <Icon name="arrow-left" color="#fff" size={25} />
          </TouchableOpacity>
      </ImageBackground>
      <View style={styles.containerPadding}>
        <Title>{filme.titulo}</Title>
        <Button
          style={styles.buttonPlay}
          icon="play"
          uppercase={false}
          mode="contained"
          color="#fff">
          Assistir
        </Button>

        <Paragraph>{filme.descricao}</Paragraph>

        <Caption style={styles.captionInfos}>
          Elenco:{' '}
          <Caption style={styles.captionWhite}>
           { filme.elenco.join(', ') }
          </Caption>
          Gêneros:{' '}
          <Caption style={styles.captionWhite}>
          { filme.generos.join(', ') }
          </Caption>{' '}
          { filme.cenas_momentos.join(', ') }
          <Caption style={styles.captionWhite}>Violentos</Caption>{' '}
        </Caption>

        <View style={styles.menu}>
          <ButtonVertical icon="plus" text="Minha Lista" />
          <ButtonVertical icon="thumb-up" text="Classifique" />
          <ButtonVertical icon="send" text="Compartilha" />
          <ButtonVertical icon="download" text="Baixar" />
        </View>

        {filme.tipo === 'serie' && (
          <>
            <TouchableOpacity
             onPress={() => setVisible(true)}
            style={styles.buttonTemporada}>
              <Text style={styles.temporadaName}>{temporada.label}</Text>
              <Icon name="chevron-down" color="#FFF" size={20} />
            </TouchableOpacity>

          <FlatList
          data={episodeos}
          renderItem={({ item, index }) => <Episodeo episodeo={item} key={index} />}
          
          />


          </>
        )}
      </View>
      {filme.tipo === 'filme' && <Secao secao={secao} hasTopBorder />}
    </ScrollView>
  </>
  );
};

export default Filme;
