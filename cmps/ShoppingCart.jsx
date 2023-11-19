const { useState, useEffect } = React
const { useDispatch } = ReactRedux

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { CLEAR_CART, REMOVE_CAR_FROM_CART, SET_USER_SCORE } from '../store/store.js'

export function ShoppingCart({ isCartShown, shoppingCart }) {
    const dispatch = useDispatch()

    // TODO: get from storeState
    const user = userService.getLoggedinUser()

    function removeFromCart(carId) {
        console.log(`Todo: remove: ${carId} from cart`)
        // TODO: use dispatch
        dispatch({ type: REMOVE_CAR_FROM_CART, carId })
    }

    function getCartTotal() {
        return shoppingCart.reduce((acc, car) => acc + car.price, 0)
    }

    function onCheckout() {
        const amount = getCartTotal()
        // TODO: checkout function that dispatch
        userService.updateScore(-amount)
            .then(newScore => {
                dispatch({ type: CLEAR_CART })
                dispatch({ type: SET_USER_SCORE, score: newScore })
                showSuccessMsg(`Charged you: $ ${amount.toLocaleString()}`)
            })
    }

    if (!isCartShown) return <span></span>
    const total = getCartTotal()
    return (
        <section className="cart" >
            <h5>Your Cart</h5>
            <ul>
                {
                    shoppingCart.map((car, idx) => <li key={idx}>
                        <button onClick={() => {
                            removeFromCart(car._id)
                        }}>x</button>
                        {car.vendor} | ${car.price}
                    </li>)
                }
            </ul>
            <p>Total: ${total} </p>
            <button disabled={!user || !total} onClick={onCheckout}>Checkout</button>
        </section>
    )
}
