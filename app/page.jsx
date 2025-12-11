export default function Page() {
  return (
    <main
  className="page-container"
  style={{
    backgroundColor: "transparent",
    boxShadow: "none",
    padding: "0",
  }}
>

      {/* ===== BIG MAIN SECTION ===== */}
      <section style={{ marginBottom: "50px" }}>
        <h2 style={{ color: "#2e8b57", marginBottom: "12px", fontSize: "28px", textAlign: "center" }}>
          What is EcoTrack?
        </h2>

        <p style={{ fontSize: "16px", marginBottom: "20px", textAlign: "center" }}>
          EcoTrack is a platform that allows you to log daily activities related to
          energy use, food consumption, transportation, and waste. By visualizing
          your personal data, EcoTrack reveals patterns and trends in your
          environmental footprint.
        </p>

        <img
          src="data:image/jpeg;base64,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"
          alt="Forest sustainability"
          style={{
            width: "200px",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
            display: "block", margin: "0 auto"
          }}
        />
      </section>

      {/* ===== FACT CARDS GRID ===== */}
      <section>
        <h2 style={{ color: "#2e8b57", marginBottom: "20px", textAlign: "center" }}>Sustainability Facts</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {/* CARD 1 */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1508873699372-7aeab60b44ab"
              alt="Recycling"
              style={{ width: "150px", borderRadius: "10px", marginBottom: "12px", display: "block", margin: "0 auto" }}
            />
            <h3 style={{ color: "#2e8b57", marginBottom: "8px", textAlign: "center" }}>Recycling</h3>
            <p style={{textAlign: "center"}} >Recycling one aluminum can saves enough energy to power a TV for three hours.</p>
          </div>

          {/* CARD 2 */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1482192596544-9eb780fc7f66"
              alt="Transportation emissions"
              style={{ width: "150px", borderRadius: "10px", marginBottom: "12px", display: "block", margin: "0 auto" }}
            />
            <h3 style={{ color: "#2e8b57", marginBottom: "8px", textAlign: "center"}}>Transportation</h3>
            <p style={{textAlign: "center"}} >Passenger vehicles account for about 45% of transportation-related CO₂ emissions.</p>
          </div>

          {/* CARD 3 */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              display: "block",
              margin: "0 auto",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6"
              alt="Water usage"
              style={{ width: "150px", borderRadius: "10px", marginBottom: "12px", display: "block", margin: "0 auto" }}
            />
            <h3 style={{ color: "#2e8b57", marginBottom: "8px", textAlign: "center" }}>Water Usage</h3>
            <p style={{textAlign: "center"}} >A typical shower uses about 2.1 gallons of water per minute in the U.S.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
