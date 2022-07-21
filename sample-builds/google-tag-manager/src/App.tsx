function App() {
  const changeUser = () => {
    window.dataLayer.push({
      event: "identify",
      userId: "abc"
    });
  };

  const logCustomEvent = () => {
    window.dataLayer.push({
      event: "add to cart"
    });
  };

  const logPurchase = () => {
    window.dataLayer.push({
      event: "purchase",
      productId: "abc",
      price: 100,
      currency: "usd",
      quantity: 1
    });
  };

  const disable = () => {
    window.dataLayer.push({
      event: "disable"
    });
  };
  const enable = () => {
    window.dataLayer.push({
      event: "enable"
    });
  };

  const logEcommerceEvent = () => {
    window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
    window.dataLayer.push({
      event: "ecommerce",
      ecommerce: {
        transaction_id: "T_12345",
        affiliation: "Google Merchandise Store",
        value: 25.42,
        tax: 4.9,
        shipping: 5.99,
        currency: "USD",
        coupon: "SUMMER_SALE",
        items: [
          {
            item_id: "SKU_12345",
            item_name: "Stan and Friends Tee",
            affiliation: "Google Merchandise Store",
            coupon: "SUMMER_FUN",
            currency: "USD",
            discount: 2.22,
            index: 0,
            item_brand: "Google",
            item_category: "Apparel",
            item_category2: "Adult",
            item_category3: "Shirts",
            item_category4: "Crew",
            item_category5: "Short sleeve",
            item_list_id: "related_products",
            item_list_name: "Related Products",
            item_variant: "green",
            location_id: "L_12345",
            price: 9.99,
            quantity: 1
          },
          {
            item_id: "SKU_12346",
            item_name: "Google Grey Women's Tee",
            affiliation: "Google Merchandise Store",
            coupon: "SUMMER_FUN",
            currency: "USD",
            discount: 3.33,
            index: 1,
            item_brand: "Google",
            item_category: "Apparel",
            item_category2: "Adult",
            item_category3: "Shirts",
            item_category4: "Crew",
            item_category5: "Short sleeve",
            item_list_id: "related_products",
            item_list_name: "Related Products",
            item_variant: "gray",
            location_id: "L_12345",
            price: 20.99,
            promotion_id: "P_12345",
            promotion_name: "Summer Sale",
            quantity: 1
          }
        ]
      }
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          This is a sample app demonstrating the Google Tag Manager integration
          with Braze.
        </p>
        <button onClick={changeUser}>Change User</button>
        <br />
        <br />
        <button onClick={logCustomEvent}>Log Custom Event</button>
        <br />
        <br />
        <button onClick={logPurchase}>Log Purchase</button>
        <br />
        <br />
        <button onClick={logEcommerceEvent}>Log E-Commerce Purchase</button>
        <br />
        <br />
        <button onClick={disable}>Disable SDK</button>
        <br />
        <br />
        <button onClick={enable}>Enable SDK</button>
      </header>
    </div>
  );
}

export default App;
