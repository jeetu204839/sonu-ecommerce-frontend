export default function HomeProductsSectionFallback() {
  return (
    <div
      className="container-fluid shop-products-section home-products-section py-4 py-lg-5 px-0"
      aria-busy="true"
      aria-label="Loading products"
    >
      <div className="shop-products-inner container px-0 px-lg-3">
        <div className="home-products-header mb-4">
          <div
            className="placeholder-glow"
            style={{ maxWidth: "22rem", height: "2rem", marginBottom: "0.75rem" }}
          >
            <span className="placeholder col-12 h-100 rounded" />
          </div>
          <div className="placeholder-glow" style={{ maxWidth: "16rem", height: "1rem" }}>
            <span className="placeholder col-12 h-100 rounded" />
          </div>
        </div>

        <div className="row g-3 mb-4">
          {["a", "b", "c", "d"].map((key) => (
            <div className="col-3 col-md-2" key={key}>
              <div className="placeholder-glow">
                <span
                  className="placeholder rounded-circle d-block"
                  style={{ width: "3.5rem", height: "3.5rem" }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="row g-3">
          {["e", "f", "g", "h"].map((key) => (
            <div className="col-6 col-lg-3" key={key}>
              <div className="placeholder-glow border rounded p-3 bg-white">
                <span
                  className="placeholder col-12 rounded mb-3"
                  style={{ height: "8rem", display: "block" }}
                />
                <span className="placeholder col-10 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
