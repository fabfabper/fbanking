import React from "react";
import { Platform, Animated } from "react-native";
import { useAppTheme } from "@ebanking/ui";
import { TransactionScreen } from "../TransactionScreen";
import type { Transaction } from "@ebanking/api";

interface Props {
  isWeb: boolean;
  visible: boolean;
  transaction: Transaction | null;
  onClose: () => void;
  sheetAnim?: Animated.Value;
}

export const TransactionDetailDrawer: React.FC<Props> = ({ isWeb, visible, transaction, onClose, sheetAnim }) => {
  const { theme } = useAppTheme();

  if (!visible || !transaction) return null;

  if (isWeb) {
    return (
      <>
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.2)",
            zIndex: 9998,
          }}
        />
        <div
          style={{
            position: "fixed",
            top: "50%",
            right: 0,
            width: 400,
            maxHeight: "80vh",
            boxShadow: "-2px 0 12px rgba(0,0,0,0.15)",
            zIndex: 9999,
            transition: "transform 0.3s",
            transform: visible ? "translate(0, -50%)" : "translate(100%, -50%)",
            display: "flex",
            flexDirection: "column",
            borderRadius: "16px 0 0 16px",
            overflowY: "auto",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <TransactionScreen transaction={transaction} onClose={onClose} />
        </div>
      </>
    );
  }

  // Mobile bottom sheet
  return (
    <>
      <Animated.View
        onStartShouldSetResponder={() => true}
        onResponderRelease={onClose}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.2)",
          zIndex: 9998,
        }}
      />
      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "50%",
          backgroundColor: theme.colors.backgroundElevatedLight,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          zIndex: 9999,
          transform: [
            { translateY: sheetAnim ? sheetAnim.interpolate({ inputRange: [0, 1], outputRange: [400, 0] }) : 0 },
          ],
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          elevation: 8,
        }}
        onStartShouldSetResponder={() => true}
        onResponderMove={(e) => {
          const touchY = e.nativeEvent.pageY;
          if (touchY > 300) onClose();
        }}
        onResponderRelease={(e) => {
          const touchY = e.nativeEvent.pageY;
          if (touchY > 300) onClose();
        }}
      >
        <TransactionScreen transaction={transaction} onClose={onClose} />
      </Animated.View>
    </>
  );
};
