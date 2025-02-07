import { Rings } from "react-loader-spinner";
import trading from "../assets/trading.webp";
import { useEffect } from "react";

const Loading = () => {
    useEffect(() => {
        const styleSheet = document.styleSheets[0];

        // Continuous Fast Zoom-In Background Animation
        styleSheet.insertRule(`
            @keyframes fastZoomInBackground {
                0% { transform: scale(1); }
                100% { transform: scale(2); }  /* Keeps zooming in */
            }
        `, styleSheet.cssRules.length);

        // Glowing Effect for Better Visibility
        styleSheet.insertRule(`
            @keyframes glowEffect {
                0% { filter: drop-shadow(0px 0px 5px skyblue); }
                50% { filter: drop-shadow(0px 0px 20px skyblue); }
                100% { filter: drop-shadow(0px 0px 5px skyblue); }
            }
        `, styleSheet.cssRules.length);
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.overlay}></div>
            <div style={styles.loaderContainer}>
                <Rings
                    visible={true}
                    height="160"
                    width="160"
                    color="skyblue"
                    ariaLabel="rings-loading"
                    wrapperStyle={styles.loader}
                />
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundImage: `url(${trading})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: 1,
        animation: "fastZoomInBackground 3s linear infinite", // Fast zoom-in effect
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.8)", // Darker overlay for better visibility
        zIndex: 2,
    },
    loaderContainer: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 3, // Ensures loader is above everything
    },
    loader: {
        animation: "glowEffect 2s ease-in-out infinite",
    },
};

export default Loading;
