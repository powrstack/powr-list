import React, {useState} from 'react';
import {ActivityIndicator, RefreshControl, View, Text} from 'react-native';
import SkeletonContent from 'react-native-reanimated-skeleton';
import { FlashList } from "@shopify/flash-list";

const LoadingFooter = ({loadingMore}) => {
  if (loadingMore) {
    return (
      <View
        style={{
          justifyContent: 'center',
          width: 50
        }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View
      style={{
        height: '200@ms',
        height: '15@ms'
      }}></View>
  );
};

const LoadingtLayout = [
  {
    width: 100,
    height: 100,
    borderRadius: 2
  },
  {
    flexDirection: 'column',
    marginLeft: 10,
    backgroundColor: 'white',
    flex: 1,
    children: [
      {
        width: '100%',
        height: '20%',
        marginBottom: 10
      },
      {
        width: '50%',
        height: '20%',
        marginBottom: 10
      }
    ]
  }
];

const LoadingList = () => (
  <View style={{flex: 1}}>
    <View
      style={{
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 40,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <SkeletonContent
        // duration={300}
        containerStyle={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', backgroundColor: 'white'}}
        animationType="pulse"
        animationDirection="horizontalRight"
        layout={LoadingtLayout}
        isLoading={true}
      />
      <SkeletonContent
        // duration={300}
        containerStyle={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', backgroundColor: 'white'}}
        animationType="pulse"
        animationDirection="horizontalRight"
        layout={LoadingtLayout}
        isLoading={true}
      />
      <SkeletonContent
        // duration={300}
        containerStyle={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', backgroundColor: 'white'}}
        animationType="pulse"
        animationDirection="horizontalRight"
        layout={LoadingtLayout}
        isLoading={true}
      />
    </View>
  </View>
);

const EmptyList = () => (
  <View style={{flex: 1}}>
    <View style={{flex: 1, height: 550, justifyContent: 'center', alignItems: 'center'}}>
      <Text>No Items</Text>
    </View>
  </View>
);

export default function PowrList({
  list,
  listTitle,
  listStyle,
  onRefresh,
  renderItem,
  renderHeader,
  renderSectionHeader,
  renderFooter,
  loading,
  loadingMore,
  fetchMore,
  numColumns = 1,
  itemKey,
  estimatedItemSize = 200,
  keyExtractor
}) {
  const [refreshing, setRefreshing] = useState(false);

  const _renderFooter = renderFooter || null;

  const _renderHeader = renderHeader || null;

  const _onEndReached = () => {
    if (onRefresh && fetchMore) {
      let newPageId = pageId + 1;
      setPageId(newPageId);
      onRefresh(newPageId);
    }
  };

  const _keyExtractor = keyExtractor || (item => (typeof item === 'string' ? item : item[itemKey]));

  const _renderEmpty = () => (loading ? <LoadingList /> : <EmptyList />);

  const _renderSectionTitle = item => (
    <View style={{paddingLeft: 15}}>
      <Text style={{fontWeight: 'bold', color: 'black', fontSize: 12}}>{item} </Text>
    </View>
  );

  const _renderSectionHeader = renderSectionHeader || _renderSectionTitle;

  const _renderItem = props => {
    const {index, item} = props;
    return (
      <>
        {index === 0 ? (
          <>
            <View style={{height: 4}} />
            <View style={{backgroundColor: 'white', padding: 15}}>
              {listTitle ? <Text style={{fontWeight: 'bold', fontSize: 18, color: 'black'}}>{listTitle}</Text> : null}
            </View>
          </>
        ) : (
          <></>
        )}

        <View style={{backgroundColor: 'white', paddingHorizontal: 2, paddingVertical: 3, ...listStyle}}>
          {typeof item === 'string' ? _renderSectionHeader(item) : renderItem(props)}
        </View>

        {index === list.length - 1 ? (
          <>
            <View style={{backgroundColor: 'white', padding: 10}}>
              <LoadingFooter loadingMore={loadingMore} />
            </View>
            <View style={{height: 4}} />
          </>
        ) : (
          <></>
        )}
      </>
    );
  };

  const _refreshControl = onRefresh ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> : null;

  return (
    <View style={{flex: 1}}>
      <FlashList
        contentContainerStyle={{backgroundColor: 'lightgrey'}}
        ListHeaderComponent={_renderHeader}
        ListFooterComponent={_renderFooter}
        ListEmptyComponent={_renderEmpty}
        showsVerticalScrollIndicator={false}
        refreshControl={_refreshControl}
        keyExtractor={_keyExtractor}
        numColumns={numColumns}
        onEndReached={_onEndReached}
        data={list}
        estimatedItemSize={estimatedItemSize}
        renderItem={_renderItem}
      />
    </View>
  );
}
