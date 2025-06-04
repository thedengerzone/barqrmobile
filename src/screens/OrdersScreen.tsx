import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Card,
  Divider,
  IconButton,
  List,
  Searchbar,
  Surface,
  Text,
  useTheme,
} from 'react-native-paper';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {orderService} from '../services/order';
import {Order} from '../interface/order';

const OrdersScreen = () => {
  const theme = useTheme();
  const route = useRoute();
  const {barId} = route.params as { barId: number };

  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getAll(barId);
      if (response) {
        setOrders(response);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  // Re-trigger when screen gains focus
  useFocusEffect(
      useCallback(() => {
        fetchOrders();
      }, [barId])
  );

  return (
      <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.header}>
          <Searchbar
              placeholder="Search by table/order..."
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.searchbar}
              icon="magnify"
          />
          <IconButton
              icon="refresh"
              onPress={fetchOrders}
              disabled={loading}
              style={styles.refreshButton}
          />
        </View>

        <List.Section>
          <List.Subheader style={{color: theme.colors.secondary}}>
            Recent Orders
          </List.Subheader>
          {orders
          .filter((order) =>
              `${order.tableNumber} ${order.id}`
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          )
          .map((order) => (
              <Card key={order.id} style={styles.orderCard} mode="outlined">
                <Card.Title
                    title={`Table #${order.tableNumber}`}
                    subtitle={`Order #${order.id} • ${order.status}`}
                    left={(props) => <List.Icon {...props} icon="food" />}
                />
                <Card.Content>
                  {order.orderItems.map((item, idx) => (
                      <View key={idx} style={{marginBottom: 6}}>
                        <Text>
                          {item.quantity} × {item.name} — ${item.price.toFixed(2)}
                        </Text>
                        {item.specialInstructions && (
                            <Text style={{fontStyle: 'italic', fontSize: 12}}>
                              Note: {item.specialInstructions}
                            </Text>
                        )}
                      </View>
                  ))}
                  <Divider style={{marginVertical: 8}}/>
                  <Text style={{fontWeight: 'bold', color: theme.colors.primary}}>
                    Total: ${order.orderItems
                  .reduce((sum, i) => sum + i.price * i.quantity, 0)
                  .toFixed(2)}
                  </Text>
                </Card.Content>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    marginTop: 8,
  },
  searchbar: {
    flex: 1,
    elevation: 4,
    marginRight: 8,
  },
  refreshButton: {
    marginTop: 2,
  },
  orderCard: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
});

export default OrdersScreen;
