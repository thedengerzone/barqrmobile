// src/screens/OrdersScreen.tsx
import React, {useEffect} from 'react';
import { StyleSheet } from 'react-native';
import { Surface, Text, Card, useTheme, List, Searchbar } from 'react-native-paper';

const OrdersScreen = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = React.useState('');

  useEffect(() => {

  }, [])

  return (
      <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Searchbar
            placeholder="Search orders..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchbar}
            icon="magnify"
        />
        <List.Section>
          <List.Subheader style={{ color: theme.colors.secondary }}>Recent Orders</List.Subheader>
          {[1, 2, 3].map((item) => (
              <Card key={item} style={styles.orderCard} mode="outlined">
                <Card.Title
                    title={`Order #${1000 + item}`}
                    subtitle="2 mins ago"
                    left={(props) => <List.Icon {...props} icon="food" />}
                    right={(props) => (
                        <Text {...props} style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
                          $25.99
                        </Text>
                    )}
                />
              </Card>
          ))}
        </List.Section>
      </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchbar: {
    margin: 16,
    elevation: 4,
  },
  orderCard: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
});

export default OrdersScreen;