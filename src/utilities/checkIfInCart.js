function checkIfInCart(cart, product) {
    return cart.find(item => item.id === product.id)
}

export default checkIfInCart