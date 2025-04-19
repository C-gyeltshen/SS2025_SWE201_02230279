import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function FacebookFeed() {
  // Sample data for posts
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: "Chimi CR",
      timePosted: "2 hrs ago",
      avatarUrl: "https://randomuser.me/api/portraits/women/12.jpg",
      content: "Enjoyed the weekend with friends! Such an amazing time.",
      imageUrl:
        "https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      likes: 152,
      comments: 23,
      shares: 5,
      isLiked: false,
    },
    {
      id: 2,
      username: "Gyaltsen",
      timePosted: "5 hrs ago",
      avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
      content: "Just completed my first marathon! Hard work pays off.",
      imageUrl:
        "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      likes: 304,
      comments: 56,
      shares: 12,
      isLiked: false,
    },
    {
      id: 3,
      username: "Tenzin",
      timePosted: "12 hrs ago",
      avatarUrl: "https://randomuser.me/api/portraits/women/45.jpg",
      content:
        "The new café downtown has amazing pastries! Highly recommend checking it out.",
      imageUrl:
        "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      likes: 89,
      comments: 11,
      shares: 3,
      isLiked: false,
    },
    {
      id: 4,
      username: "Dorji",
      timePosted: "1 day ago",
      avatarUrl: "https://randomuser.me/api/portraits/men/67.jpg",
      content:
        "Beautiful sunset today at the beach. Nature never fails to amaze me.",
      imageUrl:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      likes: 421,
      comments: 34,
      shares: 15,
      isLiked: false,
    },
  ]);

  // Handle like button press
  const handleLike = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const newIsLiked = !post.isLiked;
          return {
            ...post,
            isLiked: newIsLiked,
            likes: newIsLiked ? post.likes + 1 : post.likes - 1,
          };
        }
        return post;
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>facebook</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.searchIcon}>
            <Ionicons name="search" size={22} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.messageIcon}>
            <FontAwesome name="facebook-messenger" size={22} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main content */}
      <ScrollView style={styles.scrollView}>
        {/* Stories row */}
        <View style={styles.storiesContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.storiesScroll}
          >
            {/* Add story button */}
            <View style={styles.addStoryContainer}>
              <View style={styles.addStoryImageContainer}>
                <Image
                  source={{
                    uri: "https://randomuser.me/api/portraits/women/12.jpg",
                  }}
                  style={styles.addStoryImage}
                />
                <View style={styles.addStoryButton}>
                  <Ionicons name="add-circle" size={24} color="#1877f2" />
                </View>
              </View>
              <Text style={styles.storyText}>Add to Story</Text>
            </View>

            {/* Other stories */}
            {["Gyaltsen", "Tenzin", "Dorji", "Karma", "Pema"].map(
              (name, index) => (
                <View key={index} style={styles.storyContainer}>
                  <View style={styles.storyImageContainer}>
                    <Image
                      source={{
                        uri: `https://randomuser.me/api/portraits/${
                          index % 2 === 0 ? "men" : "women"
                        }/${20 + index}.jpg`,
                      }}
                      style={styles.storyImage}
                    />
                  </View>
                  <Text style={styles.storyText}>{name}</Text>
                </View>
              )
            )}
          </ScrollView>
        </View>

        {/* Create post section */}
        <View style={styles.createPostContainer}>
          <View style={styles.createPostRow}>
            <Image
              source={{
                uri: "https://randomuser.me/api/portraits/women/12.jpg",
              }}
              style={styles.userAvatar}
            />
            <TextInput
              style={styles.createPostInput}
              placeholder="What's on your mind?"
              placeholderTextColor="#65676b"
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.postActionsContainer}>
            <TouchableOpacity style={styles.postAction}>
              <Ionicons name="videocam" size={20} color="#F44337" />
              <Text style={styles.postActionText}>Live</Text>
            </TouchableOpacity>
            <View style={styles.postActionDivider} />
            <TouchableOpacity style={styles.postAction}>
              <Ionicons name="images" size={20} color="#4CAF50" />
              <Text style={styles.postActionText}>Photos</Text>
            </TouchableOpacity>
            <View style={styles.postActionDivider} />
            <TouchableOpacity style={styles.postAction}>
              <MaterialCommunityIcons
                name="video-plus"
                size={22}
                color="#673AB7"
              />
              <Text style={styles.postActionText}>Room</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Posts feed */}
        {posts.map((post) => (
          <View key={post.id} style={styles.postContainer}>
            <View style={styles.postHeader}>
              <Image
                source={{ uri: post.avatarUrl }}
                style={styles.postAvatar}
              />
              <View style={styles.postHeaderInfo}>
                <Text style={styles.postUsername}>{post.username}</Text>
                <Text style={styles.postTime}>{post.timePosted}</Text>
              </View>
              <TouchableOpacity style={styles.postMenu}>
                <Ionicons
                  name="ellipsis-horizontal"
                  size={20}
                  color="#65676b"
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.postContent}>{post.content}</Text>

            {post.imageUrl && (
              <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
            )}

            <View style={styles.postStats}>
              <View style={styles.likesContainer}>
                <View style={styles.likeIconsContainer}>
                  <View style={[styles.likeIcon, styles.likeIconBlue]}>
                    <FontAwesome name="thumbs-up" size={10} color="#fff" />
                  </View>
                  <View style={[styles.likeIcon, styles.likeIconRed]}>
                    <FontAwesome name="heart" size={10} color="#fff" />
                  </View>
                </View>
                <Text style={styles.statsText}>{post.likes}</Text>
              </View>
              <View style={styles.commentsSharesContainer}>
                <Text style={styles.statsText}>{post.comments} Comments</Text>
                <Text style={styles.statsText}>{post.shares} Shares</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.postActions}>
              <TouchableOpacity
                style={styles.postActionButton}
                onPress={() => handleLike(post.id)}
              >
                <FontAwesome
                  name="thumbs-up"
                  size={20}
                  color={post.isLiked ? "#1877f2" : "#65676b"}
                />
                <Text
                  style={[
                    styles.postActionButtonText,
                    post.isLiked && styles.activeActionText,
                  ]}
                >
                  Like
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.postActionButton}>
                <FontAwesome name="comment" size={20} color="#65676b" />
                <Text style={styles.postActionButtonText}>Comment</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.postActionButton}>
                <FontAwesome name="share" size={20} color="#65676b" />
                <Text style={styles.postActionButtonText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="home" size={26} color="#1877f2" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="people" size={26} color="#65676b" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="tv" size={26} color="#65676b" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <FontAwesome name="shopping-bag" size={22} color="#65676b" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="notifications" size={26} color="#65676b" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="menu" size={26} color="#65676b" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#dddfe2",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1877f2",
  },
  headerIcons: {
    flexDirection: "row",
  },
  searchIcon: {
    backgroundColor: "#f0f2f5",
    borderRadius: 50,
    height: 36,
    width: 36,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  messageIcon: {
    backgroundColor: "#f0f2f5",
    borderRadius: 50,
    height: 36,
    width: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  storiesContainer: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    marginBottom: 8,
  },
  storiesScroll: {
    paddingLeft: 15,
  },
  addStoryContainer: {
    width: 100,
    marginRight: 8,
  },
  addStoryImageContainer: {
    height: 140,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#dddfe2",
    overflow: "hidden",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  addStoryImage: {
    width: "100%",
    height: "100%",
    opacity: 0.7,
  },
  addStoryButton: {
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 50,
    bottom: 5,
    borderWidth: 3,
    borderColor: "#fff",
  },
  storyContainer: {
    width: 100,
    marginRight: 8,
  },
  storyImageContainer: {
    height: 140,
    borderRadius: 12,
    backgroundColor: "#dddfe2",
    overflow: "hidden",
    position: "relative",
  },
  storyImage: {
    width: "100%",
    height: "100%",
  },
  storyText: {
    marginTop: 5,
    fontSize: 12,
    textAlign: "center",
  },
  createPostContainer: {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 8,
  },
  createPostRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  createPostInput: {
    flex: 1,
    backgroundColor: "#f0f2f5",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#dddfe2",
    marginVertical: 10,
  },
  postActionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postAction: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingVertical: 5,
  },
  postActionText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#65676b",
  },
  postActionDivider: {
    width: 1,
    backgroundColor: "#dddfe2",
  },
  postContainer: {
    backgroundColor: "#fff",
    marginBottom: 8,
    padding: 12,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postHeaderInfo: {
    flex: 1,
  },
  postUsername: {
    fontWeight: "bold",
    fontSize: 16,
  },
  postTime: {
    fontSize: 12,
    color: "#65676b",
  },
  postMenu: {
    padding: 5,
  },
  postContent: {
    fontSize: 14,
    marginBottom: 10,
    lineHeight: 20,
  },
  postImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  postStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  likeIconsContainer: {
    flexDirection: "row",
    marginRight: 5,
  },
  likeIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: -6,
  },
  likeIconBlue: {
    backgroundColor: "#1877f2",
    zIndex: 1,
  },
  likeIconRed: {
    backgroundColor: "#e41e3f",
  },
  statsText: {
    fontSize: 12,
    color: "#65676b",
  },
  commentsSharesContainer: {
    flexDirection: "row",
  },
  commentsSharesContainer: {
    flexDirection: "row",
    gap: 10,
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postActionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingVertical: 5,
  },
  postActionButtonText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#65676b",
  },
  activeActionText: {
    color: "#1877f2",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#dddfe2",
    paddingHorizontal: 15,
  },
  navButton: {
    paddingHorizontal: 8,
  },
});
