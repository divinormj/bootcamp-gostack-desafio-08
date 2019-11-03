import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '../../styles/colors';
import { formatPrice } from '../../util/format';

import * as CartActions from '../../store/modules/cart/actions';

import {
  Container,
  ListProducts,
  CartProduct,
  ProductInfo,
  ProductImage,
  ProductDetail,
  ProductTitle,
  ProductPrice,
  ProductDelete,
  ProductAmount,
  ProductQuantity,
  ProductQuantityButton,
  ProductQuantityText,
  CartTotal,
  CartTotalLabel,
  CartTotalPrice,
  CartOrder,
  CartOrderLabel,
} from './styles';

export default function Cart() {
  const products = useSelector(state => state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
    }))
  );

  const total = useSelector(state => formatPrice(
    state.cart.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0))
  );

  const dispatch = useDispatch();

  function increment(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  }

  function decrement(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  }

  function renderProduct({item}) {
    return (
      <CartProduct key={item.id}>
        <ProductInfo>
          <ProductImage source={{ uri: item.image }} />
          <ProductDetail>
            <ProductTitle>{item.title}</ProductTitle>
            <ProductPrice>{item.priceFormatted}</ProductPrice>
          </ProductDetail>
          <ProductDelete onPress={() => dispatch(CartActions.removeFromCart(item.id))}>
            <Icon name="delete-forever" color={colors.primary} size={20} />
          </ProductDelete>
        </ProductInfo>
        <ProductAmount>
          <ProductQuantity>
            <ProductQuantityButton onPress={() => decrement(item)}>
              <Icon
                name="remove-circle-outline"
                color={colors.primary}
                size={20}
              />
            </ProductQuantityButton>
            <ProductQuantityText>{item.amount}</ProductQuantityText>
            <ProductQuantityButton onPress={() => increment(item)}>
              <Icon
                name="add-circle-outline"
                color={colors.primary}
                size={20}
              />
            </ProductQuantityButton>
          </ProductQuantity>
          <ProductPrice>{item.subtotal}</ProductPrice>
        </ProductAmount>
      </CartProduct>
    );
  }

  function renderFooter() {
    return (
      <CartTotal>
        <CartTotalLabel>TOTAL</CartTotalLabel>
        <CartTotalPrice>{total}</CartTotalPrice>
        <CartOrder>
          <CartOrderLabel>FINALIZAR PEDIDO</CartOrderLabel>
        </CartOrder>
      </CartTotal>
    );
  }

  return (
    <Container>
      <ListProducts
        data={products}
        keyExtractor={item => String(item.id)}
        renderItem={renderProduct}
        ListFooterComponent={renderFooter}
      />
    </Container>
  );
}
