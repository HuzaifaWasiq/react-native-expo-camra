import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions
} from "react-native";
import { useWindowDimensions } from "react-native";
import { useState, useEffect, useRef } from "react";
import { Ionicons, MaterialCommunityIcons, FontAwesome5, Feather } from "@expo/vector-icons";
import { ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

const Home = () => {
  const [isOffline, setIsOffline] = useState(false);
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;


  // Animation values
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  // Header animation based on scroll
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: isLandscape ? [240, 160] : [300, 180],
    extrapolate: "clamp",
  });


  // Fade in animation on load
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 25,
        friction: 8,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  // Commodities data
  const commodities = [
    { id: 1, name: "Rice", icon: "🌾", color: "#4CAF50" },
    { id: 2, name: "Corn", icon: "🌽", color: "#FF9800" },
    { id: 3, name: "Grapes", icon: "🍇", color: "#9C27B0" },
    { id: 4, name: "Potato", icon: "🥔", color: "#795548" },
    { id: 5, name: "Olive", icon: "🫒", color: "#8BC34A" },
  ];

  // Advisories data
  const advisories = [
    {
      id: 1,
      type: "weather",
      icon: "cloud-rain",
      title: "Rain Advisory",
      message: "Rain expected in 24 hours. Avoid irrigation today.",
      color: "#2196F3",
      time: "2h ago"
    },
    {
      id: 2,
      type: "pest",
      icon: "bug",
      title: "Pest Alert",
      message: "Monitor for aphids in nearby fields.",
      color: "#F44336",
      time: "1d ago"
    },
    {
      id: 3,
      type: "fertilizer",
      icon: "leaf",
      title: "Fertilizer Schedule",
      message: "Apply NPK fertilizer next week.",
      color: "#4CAF50",
      time: "3d ago"
    }
  ];

  // Sensor areas data
  const sensorAreas = [
    {
      id: 1,
      name: "Field A",
      crop: "Rice",
      area: "2.5 Acres",
      status: "optimal",
      sensors: 5,
      moisture: "68%",
      temperature: "28°C",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef"
    },
    {
      id: 2,
      name: "Field B",
      crop: "Wheat",
      area: "3.2 Acres",
      status: "warning",
      sensors: 4,
      moisture: "42%",
      temperature: "32°C",
      image: "https://images.unsplash.com/photo-1560493676-04071c5f467b"
    }
  ];

  // Weather data
  const weatherData = {
    temp: 16,
    humidity: 59,
    wind: 6,
    condition: "Partly Cloudy",
    icon: "partly-sunny",
    feelsLike: 18,
    sunrise: "6:45 AM",
    sunset: "5:30 PM"
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Animated Header with Background Image */}
      <Animated.View style={[
        styles.header,
        { height: headerHeight }
      ]}>
        <ImageBackground
          source={require("../../assets/top-img.jpg")}
          style={styles.headerBackground}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.3)']}
            style={[
              styles.headerGradient,
              isLandscape && styles.headerGradientLandscape
            ]}
          >
            <View style={[
              styles.headerTop,
              isLandscape && styles.headerTopLandscape
            ]}>
              <View style={styles.profileContainer}>
                <Image
                  source={require("../../assets/user.png")}
                  style={styles.profileImage}
                />
                <View style={styles.profileInfo}>
                  <Text style={styles.hello}>Welcome, Farmer</Text>
                  <Text style={styles.date}>Sunday, 01 Dec 2024</Text>
                  <View style={styles.statusContainer}>
                    <View style={[styles.statusDot, isOffline ? styles.offline : styles.online]} />
                    <Text style={styles.statusText}>{isOffline ? "Offline" : "Online"}</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.notificationButton}>
                <Ionicons name="notifications-outline" size={26} color="#FFF" />
                <View style={styles.notificationBadge} />
              </TouchableOpacity>
            </View>

            {/* Glassmorphism Voice Bot Card */}
            <Animated.View
              style={[
                styles.voiceBotCard,
                isLandscape && styles.voiceBotCardLandscape,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']}
                style={[
                  styles.voiceBotGradient,
                  isLandscape && styles.voiceBotGradientLandscape
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                {/* Background blur effect */}
                <View style={styles.glassOverlay} />

                <View style={styles.voiceBotContent}>
                  <View style={[
                    styles.voiceBotIcon,
                    isLandscape && styles.voiceBotIconLandscape
                  ]}>
                    <FontAwesome5 
                      name="robot" 
                      size={isLandscape ? 24 : 28} 
                      color="#FFF" 
                    />
                  </View>
                  <View style={styles.voiceBotText}>
                    <Text style={[
                      styles.voiceBotTitle,
                      isLandscape && styles.voiceBotTitleLandscape
                    ]}>KHAIR Voice Assistant</Text>
                    <Text style={[
                      styles.voiceBotSubtitle,
                      isLandscape && styles.voiceBotSubtitleLandscape
                    ]}>Tap to ask farming guidance</Text>
                  </View>
                  <TouchableOpacity style={[
                    styles.micButton,
                    isLandscape && styles.micButtonLandscape
                  ]}>
                    <Ionicons 
                      name="mic" 
                      size={isLandscape ? 20 : 24} 
                      color="#FFF" 
                    />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </Animated.View>
          </LinearGradient>
        </ImageBackground>
      </Animated.View>

      {/* Main Content */}
      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        contentContainerStyle={styles.scrollContent}
      >
        <View
          style={[
            styles.content,
            isLandscape && styles.contentLandscape
          ]}
        >

          {/* Weather Card */}
          <Animated.View
            style={[
              styles.weatherCard,
              isLandscape && styles.weatherCardLandscape
            ]}
          >
            <ImageBackground
              source={require("../../assets/weather-bg.jpg")} // Or use your own image
              style={styles.weatherBackground}
              imageStyle={styles.weatherImageStyle}
            >
              <LinearGradient
                colors={['rgba(98, 93, 93, 0.6)', 'rgba(37, 34, 34, 0.2)']}
                style={styles.weatherGradient}
              >
                <View style={styles.weatherHeader}>
                  <View style={styles.weatherTitle}>
                    <Ionicons name={weatherData.icon} size={32} color="#FFF" />
                    <Text style={styles.weatherTitleText}>Today's Weather</Text>
                  </View>
                  <Text style={styles.weatherTime}>Updated just now</Text>
                </View>

                <View style={styles.weatherMain}>
                  <Text style={styles.temp}>{weatherData.temp}°C</Text>
                  <Text style={styles.weatherCondition}>{weatherData.condition}</Text>
                </View>

                <View style={styles.weatherDetails}>
                  <View style={styles.weatherDetail}>
                    <Ionicons name="water-outline" size={20} color="#FFF" />
                    <Text style={styles.detailValue}>{weatherData.humidity}%</Text>
                    <Text style={styles.detailLabel}>Humidity</Text>
                  </View>

                  <View style={styles.weatherDetail}>
                    <Ionicons name="speedometer-outline" size={20} color="#FFF" />
                    <Text style={styles.detailValue}>{weatherData.wind} m/s</Text>
                    <Text style={styles.detailLabel}>Wind</Text>
                  </View>

                  <View style={styles.weatherDetail}>
                    <Ionicons name="thermometer-outline" size={20} color="#FFF" />
                    <Text style={styles.detailValue}>{weatherData.feelsLike}°C</Text>
                    <Text style={styles.detailLabel}>Feels Like</Text>
                  </View>
                </View>
              </LinearGradient>
            </ImageBackground>
          </Animated.View>

          {/* Commodities Section */}
          <View style={[
            styles.commoditiesSection,
            isLandscape && styles.commoditiesSectionLandscape
          ]}>
            <View style={[
              styles.sectionHeader,
              isLandscape && styles.sectionHeaderLandscape
            ]}>
              <Text style={styles.sectionTitle}>Communities</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>View All</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={[
                styles.commoditiesScroll,
                isLandscape && styles.commoditiesScrollLandscape
              ]}
            >

            {commodities.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.commodityCard}
              >
                <View style={[styles.commodityIcon, { backgroundColor: item.color + '20' }]}>
                  <Text style={styles.commodityEmoji}>{item.icon}</Text>
                </View>
                <Text style={styles.commodityName}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          </View>

          {/* Sensor Areas */}
          <View style={[
            styles.sectionHeader,
            isLandscape && styles.sectionHeaderLandscape
          ]}>
            <Text style={styles.sectionTitle}>Sensor Areas</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
              <Ionicons name="arrow-forward" size={16} color="#4CAF50" />
            </TouchableOpacity>
          </View>

          <View style={[
            styles.sensorAreasContainer,
            isLandscape && styles.sensorAreasContainerLandscape
          ]}>
            {sensorAreas.map((area) => (
              <TouchableOpacity
                key={area.id}
                style={[
                  styles.sensorCard,
                  isLandscape && styles.sensorCardLandscape
                ]}
              >
              <ImageBackground
                source={{ uri: area.image }}
                style={styles.sensorBackground}
              >
                <LinearGradient
                  colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.3)']}
                  style={styles.sensorGradient}
                >
                  <View style={styles.sensorHeader}>
                    <View>
                      <Text style={styles.sensorName}>{area.name}</Text>
                      <Text style={styles.sensorCrop}>{area.crop} • {area.area}</Text>
                    </View>
                    <View style={[
                      styles.statusBadge,
                      area.status === 'optimal' ? styles.optimalBadge : styles.warningBadge
                    ]}>
                      <Text style={styles.statusBadgeText}>
                        {area.status.charAt(0).toUpperCase() + area.status.slice(1)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.sensorDetails}>
                    <View style={styles.sensorDetail}>
                      <Ionicons name="thermometer-outline" size={16} color="#FFF" />
                      <Text style={styles.sensorDetailText}>{area.temperature}</Text>
                    </View>
                    <View style={styles.sensorDetail}>
                      <Ionicons name="water-outline" size={16} color="#FFF" />
                      <Text style={styles.sensorDetailText}>{area.moisture}</Text>
                    </View>
                    <View style={styles.sensorDetail}>
                      <Ionicons name="hardware-chip-outline" size={16} color="#FFF" />
                      <Text style={styles.sensorDetailText}>{area.sensors} Sensors</Text>
                    </View>
                  </View>
                </LinearGradient>
              </ImageBackground>
              </TouchableOpacity>
            ))}
          </View>

          {/* Advisories */}
          <View style={[
            styles.sectionHeader,
            isLandscape && styles.sectionHeaderLandscape
          ]}>
            <Text style={styles.sectionTitle}>Advisories & Alerts</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>See All</Text>
              <Ionicons name="arrow-forward" size={16} color="#FF9800" />
            </TouchableOpacity>
          </View>

          <View style={[
            styles.advisoriesContainer,
            isLandscape && styles.advisoriesContainerLandscape
          ]}>
            {advisories.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.advisoryCard,
                  isLandscape && styles.advisoryCardLandscape
                ]}
              >
              <View style={[styles.advisoryIcon, { backgroundColor: item.color + '15' }]}>
                <Ionicons name={item.icon} size={24} color={item.color} />
              </View>
              <View style={styles.advisoryContent}>
                <View style={styles.advisoryHeader}>
                  <Text style={[styles.advisoryTitle, { color: item.color }]}>
                    {item.title}
                  </Text>
                  <Text style={styles.advisoryTime}>{item.time}</Text>
                </View>
                <Text style={styles.advisoryMessage}>{item.message}</Text>
              </View>
            </View>
            ))}
          </View>

          {/* Cost Tracker */}
          <View style={[
            styles.costTrackerCard,
            isLandscape && styles.costTrackerCardLandscape
          ]}>
            <LinearGradient
              colors={['#4E9F3D', '#1E5128']}
              style={styles.costTrackerGradient}
            >
              <View style={styles.costTrackerHeader}>
                <View style={styles.costTrackerTitleContainer}>
                  <MaterialCommunityIcons name="calculator-variant" size={24} color="#FFF" />
                  <Text style={styles.costTrackerTitle}>Cost Tracker</Text>
                </View>
                <TouchableOpacity style={styles.viewAllButton}>
                  <Text style={[styles.viewAllText, { color: '#FFF' }]}>Details</Text>
                  <Ionicons name="arrow-forward" size={16} color="#FFF" />
                </TouchableOpacity>
              </View>

              <View style={styles.costStats}>
                <View style={styles.costStat}>
                  <Text style={styles.costLabel}>Total Cost</Text>
                  <Text style={styles.costValue}>₹42,500</Text>
                </View>
                <View style={styles.costDivider} />
                <View style={styles.costStat}>
                  <Text style={styles.costLabel}>Expected Yield</Text>
                  <Text style={[styles.costValue, styles.yieldValue]}>₹68,000</Text>
                </View>
                <View style={styles.costDivider} />
                <View style={styles.costStat}>
                  <Text style={styles.costLabel}>Net Profit</Text>
                  <Text style={[styles.costValue, styles.profitValue]}>₹25,500</Text>
                </View>
              </View>

              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '62%' }]} />
                </View>
                <Text style={styles.progressText}>62% of budget spent</Text>
              </View>
            </LinearGradient>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  content: {
    paddingBottom: 20,
  },
  header: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  headerBackground: {
    flex: 1,
    width: '100%',
  },
  headerGradient: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerGradientLandscape: {
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 25,
  },
  headerTopLandscape: {
    marginBottom: 15,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  hello: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  date: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    marginBottom: 6,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  online: {
    backgroundColor: '#4CAF50',
  },
  offline: {
    backgroundColor: '#F44336',
  },
  statusText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
    fontWeight: '500',
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5252',
  },
  // Glassmorphism Voice Bot Card
  voiceBotCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginTop: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  voiceBotGradient: {
    borderRadius: 24,
    padding: 20,
    position: 'relative',
  },
  glassOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 24,
  },
  voiceBotContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  voiceBotIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  voiceBotText: {
    flex: 1,
  },
  voiceBotTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 4,
  },
  voiceBotSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  micButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  // Weather Card with Background Image
  weatherCard: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 25,
    borderRadius: 24,
    overflow: 'hidden',
    height: 350, // Set a fixed height for better appearance
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  weatherBackground: {
    flex: 1,
    width: '100%',
  },
  weatherImageStyle: {
    borderRadius: 24,
  },
  weatherGradient: {
    flex: 1,
    padding: 20,
    borderRadius: 24,
  },
  weatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  weatherTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  weatherTitleText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  weatherTime: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  weatherMain: {
    alignItems: 'center',
    marginBottom: 20,
  },
  temp: {
    fontSize: 64,
    fontWeight: '300',
    color: '#FFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  weatherCondition: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 16,
    backdropFilter: 'blur(10px)',
  },
  weatherDetail: {
    alignItems: 'center',
  },
  detailValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    marginVertical: 4,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  detailLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  // Cost Tracker
  costTrackerCard: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 25,
    borderRadius: 24,
    overflow: 'hidden',
  },
  costTrackerGradient: {
    padding: 20,
    borderRadius: 24,
  },
  costTrackerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  costTrackerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  costTrackerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
  },
  costStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  costStat: {
    flex: 1,
    alignItems: 'center',
  },
  costLabel: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
    fontWeight: '500',
  },
  costValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFF',
  },
  yieldValue: {
    color: '#C8E6C9',
  },
  profitValue: {
    color: '#BBDEFB',
  },
  costDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  progressContainer: {
    marginTop: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFF',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
  },
  // Sections
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  seeAll: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  // Commodities
  commoditiesSection: {
    width: '100%',
  },
  commoditiesSectionLandscape: {
    width: '100%',
    flexBasis: '100%',
    marginBottom: 20,
    marginTop: 10,
  },
  commoditiesScroll: {
    paddingLeft: 20,
    marginBottom: 25,
  },
  commodityCard: {
    backgroundColor: '#FFF',
    width: 110,
    padding: 16,
    borderRadius: 20,
    marginRight: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  commodityIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  commodityEmoji: {
    fontSize: 28,
  },
  commodityName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  // Sensor Cards
  sensorCard: {
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 20,
    overflow: 'hidden',
    height: 140,
  },
  sensorBackground: {
    flex: 1,
    width: '100%',
  },
  sensorGradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  sensorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  sensorName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 4,
  },
  sensorCrop: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  optimalBadge: {
    backgroundColor: 'rgba(76, 175, 80, 0.9)',
  },
  warningBadge: {
    backgroundColor: 'rgba(255, 152, 0, 0.9)',
  },
  statusBadgeText: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: '700',
  },
  sensorDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 10,
  },
  sensorDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sensorDetailText: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '600',
  },
  // Advisories
  advisoryCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 3,
  },
  advisoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  advisoryContent: {
    flex: 1,
  },
  advisoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  advisoryTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  advisoryTime: {
    fontSize: 11,
    color: '#888',
    fontWeight: '600',
  },
  advisoryMessage: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  // Landscape styles
  contentLandscape: {
    flexDirection: 'column',
    paddingHorizontal: 15,
  },
  weatherCardLandscape: {
    width: '100%',
    marginHorizontal: 0,
    height: 320,
    marginTop: 20,
    marginBottom: 20,
  },
  sectionHeaderLandscape: {
    width: '100%',
    paddingHorizontal: 15,
  },
  sensorAreasContainer: {
    width: '100%',
  },
  sensorAreasContainerLandscape: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    width: '100%',
  },
  sensorCardLandscape: {
    width: '48%',
    marginHorizontal: 0,
    marginBottom: 15,
  },
  advisoriesContainer: {
    width: '100%',
  },
  advisoriesContainerLandscape: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    width: '100%',
  },
  advisoryCardLandscape: {
    width: '48%',
    marginHorizontal: 0,
    marginBottom: 12,
  },
  costTrackerCardLandscape: {
    width: '100%',
    marginHorizontal: 15,
  },
  voiceBotCardLandscape: {
    marginTop: 5,
  },
  voiceBotGradientLandscape: {
    padding: 15,
  },
  voiceBotTitleLandscape: {
    fontSize: 16,
  },
  voiceBotSubtitleLandscape: {
    fontSize: 12,
  },
  voiceBotIconLandscape: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  micButtonLandscape: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
});