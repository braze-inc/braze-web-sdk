function App() {

  const identifyCalls = () => {
    window.analytics.identify('g8gf2389986', {
      name: 'John Doe',
      email: 'jdoe@example.com'
    });
  };

  const trackCalls = () => {
    window.analytics.track('Signed Up', {
      plan: 'Enterprise'
    });
  };

  const orderCompletedCalls = () => {
    window.analytics.track('Order Completed', {
      products: [
        {
          product_id: "testProductID",
          price: "2.0"
        }
      ]
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          This is a sample app demonstrating Segment integration with Braze.
        </p>
        <button onClick={identifyCalls}>Identify Calls</button>
        <br />
        <br />
        <button onClick={trackCalls}>Track Calls</button>
        <br />
        <br />
        <button onClick={orderCompletedCalls}>Order Completed Calls</button>
      </header>
    </div>
  );
}

export default App;
