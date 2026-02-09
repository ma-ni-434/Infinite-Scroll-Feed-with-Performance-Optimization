import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ActivityIndicator,
  RefreshControl,
  View,
} from 'react-native';
import axios from 'axios';
import PostItem from '../components/PostItem';
import ShimmerPost from '../components/ShimmerPost';

const LIMIT = 10;

export default function FeedScreen() {
  const [posts, setPosts] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const API = 'http://10.0.2.2:5000/posts';

  const fetchPosts = async (refresh = false) => {
    if ((!refresh && loading) || (!hasMore && !refresh)) return;

    setLoading(true);

    try {
      const res = await axios.get(
        `${API}?limit=${LIMIT}&cursor=${refresh ? '' : cursor || ''}`,
      );

      const newPosts = res.data;

      if (newPosts.length < LIMIT) setHasMore(false);

      setPosts(prev => (refresh ? newPosts : [...prev, ...newPosts]));

      if (newPosts.length) {
        setCursor(newPosts[newPosts.length - 1].createdAt);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      setRefreshing(false); // ✅ CLEAN UX
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setCursor(null);
    setHasMore(true);
    fetchPosts(true);
  };

  if (!posts.length && loading) {
    return (
      <>
        {[...Array(6)].map((_, i) => (
          <ShimmerPost key={i} />
        ))}
      </>
    );
  }

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostItem item={item} />}
      keyExtractor={(item, index) =>
        `${item._id || item.id || 'post'}-${index}`
      }
      onEndReached={() => fetchPosts()}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListFooterComponent={
        loading && !refreshing ? (
          <View style={{ padding: 20 }}>
            <ActivityIndicator size="large" color="#007bff" />
          </View>
        ) : null
      }
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      removeClippedSubviews
    />
  );
}
