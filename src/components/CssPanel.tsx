import { Billboard, Html } from "@react-three/drei";
import { CountryDropdowns } from "./CountryDropdowns";

export const CssPanel = () => {
  return (
    <Billboard follow={true} position={[-1.75, 0, -500]}>
      <Html
        style={{
          width: "700px",
          height: "500px",
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          padding: "20px",
        }}
      >
        <h1>Yes! That's how my name is spelled!</h1>
        <p>
          Actually, there is a story as to why my name is spelled this way: my
          mother is from Japan and my father is from the USA. The 'J' and the
          'N' are from 'Japan'. The 'ASU' is 'USA' backwards. Put them together
          like "J", "ASU", "N" and you get "JASUN"!
        </p>
        <p>
          If you'd like to find your Jasun'd name, choose your parent(s) home
          countries below:
        </p>
        <CountryDropdowns />
        <p>
          Note: I have no control over the pronunciation of the WebAudioAPI. Use
          at your own risk and comfort level.
        </p>
      </Html>
    </Billboard>
  );
};
