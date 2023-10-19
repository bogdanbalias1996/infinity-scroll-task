import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList, Text, View, Alert} from 'react-native';
import {
  IconButton,
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
} from 'react-native-paper';

import {listFetchRequest} from './actions';
import {useDispatch, useSelector} from 'react-redux';
import {MovieList} from './types';

const Lists = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const list = useSelector(state => state.list.list);
  const listFetching = useSelector(state => state.list.listFetching);
  const isListEnd = useSelector(state => state.list.isListEnd);

  useEffect(() => {
    getList(page);
  }, [page]);

  const getList = (page: number) => {
    dispatch(listFetchRequest(page));
  };

  const fetchMoreData = () => {
    if (!isListEnd && !listFetching) {
      setPage(page + 1);
    }
  };

  const renderItem = ({item}: {item: MovieList}) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.name}</Title>
        <Paragraph>{item.description}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <IconButton
          icon="delete-outline"
          onPress={() => Alert.alert('Delete')}
        />
      </Card.Actions>
    </Card>
  );

  const renderFooter = () => (
    <View style={styles.empty}>
      {listFetching && <ActivityIndicator />}
      {isListEnd && <Text>No more data</Text>}
    </View>
  );

  const renderEmptyComponent = () => (
    <View style={styles.empty}>
      <Text>No results</Text>
    </View>
  );

  const keyExtractor = (item: MovieList) => item.id;

  return (
    <>
      <FlatList
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        data={list}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyComponent}
        ListFooterComponent={renderFooter}
        keyExtractor={keyExtractor}
        onRefresh={() => getList(1)}
        refreshing={listFetching}
        onEndReached={fetchMoreData}
      />
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 0,
  },
  card: {
    flex: 1,
    margin: 5,
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Lists;
