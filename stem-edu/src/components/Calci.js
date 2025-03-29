import { useEffect } from "react";

function DesmosGraph() {
    useEffect(() => {
        // Load Desmos API if not already loaded
        if (!window.Desmos) {
            const script = document.createElement("script");
            script.src = "https://www.desmos.com/api/v1.10/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6";
            script.async = true;
            script.onload = initializeDesmos;
            document.body.appendChild(script);
        } else {
            initializeDesmos();
        }
    }, []);

    function initializeDesmos() {
        const elt = document.getElementById("calculator");
        if (elt) {
            const calculator = window.Desmos.GraphingCalculator(elt);
            calculator.setExpression({ id: "graph1", latex: "y=x^2" });
        }
    }

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "20px", padding: "20px" }}>
            {/* Instruction Card (Left Side) */}
            <div style={{ 
                width: "250px", 
                padding: "15px", 
                border: "1px solid #ddd", 
                borderRadius: "8px", 
                boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
                backgroundColor: "#f9f9f9" 
            }}>
                <h3 style={{ marginBottom: "10px", color: "#333" }}>📖 How to Use the Graph</h3>
                <ul style={{ paddingLeft: "15px", color: "#555", fontSize: "14px" }}>
                    <li>Click inside the graph to add points.</li>
                    <li>Modify the equation <code>y = x²</code> in the settings.</li>
                    <li>Use the zoom buttons or scroll to zoom in/out.</li>
                    <li>Drag the graph to move it around.</li>
                    <li>Experiment with different functions!</li>
                </ul>
            </div>

            {/* Desmos Calculator (Right Side) */}
            <div id="calculator" style={{ width: "600px", height: "400px", border: "1px solid #ddd", borderRadius: "8px" }}></div>
        </div>
    );
}

export default DesmosGraph;
