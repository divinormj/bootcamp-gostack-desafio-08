import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';
import { formatPrice } from '../../util/format';

import * as CartActions from '../../store/modules/cart/actions';

import {
  Container,
  ListProducts,
  Product,
  ProductImage,
  ProductTitle,
  ProductPrice,
  AddCartButton,
  Cart,
  CartAmount,
  AddCartButtonText,
} from './styles';

export default function Home() {
  const [products, setProducts] = useState([]);
  const amount = useSelector(state =>
    state.cart.reduce((sumAmount, product) => {
      sumAmount[product.id] = product.amount;

    return sumAmount;
    }, {})
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('/products');

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    }

    loadProducts();
  }, []);

  renderProduct = ({ item }) => {
    return (
      <Product key={item.id}>
        <ProductImage source={{ uri: item.image }} />
        <ProductTitle>{item.title}</ProductTitle>
        <ProductPrice>{item.priceFormatted}</ProductPrice>
        <AddCartButton
          onPress={() => dispatch(CartActions.addToCartRequest(item.id))}>
          <Cart>
            <Icon name="add-shopping-cart" color="#FFF" size={20} />
            <CartAmount>{amount[item.id] || 0}</CartAmount>
          </Cart>
          <AddCartButtonText>ADICIONAR</AddCartButtonText>
        </AddCartButton>
      </Product>
    );
  };

  return (
    <Container>
      <ListProducts
        horizontal
        data={products}
        keyExtractor={item => String(item.id)}
        renderItem={renderProduct}
      />
    </Container>
  );
}
