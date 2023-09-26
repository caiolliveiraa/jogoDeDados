import React from 'react';
import { View, Text, SectionList } from 'react-native';
import useStore from '../store/Store';

const Historico = () => {
  const history = useStore((state) => state.history);

  return (
    <View>
      <Text>Histórico de Jogadas</Text>
      <SectionList
        sections={[
          {
            title: 'Histórico',
            data: history,
          },
        ]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>
              Dado 1: {item.dado1}, Dado 2: {item.dado2}, Resultado: {item.resultado}
            </Text>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <View>
            <Text>{section.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Historico;
