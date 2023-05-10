import React, {useState} from 'react';
import type { PropsWithChildren } from 'react';
import "@ethersproject/shims"
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';
import { ethers } from "ethers";

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [value, onChangeValue] = useState("");

  const [address, onChangeAddress] = useState("");

  const [status, setStatus] = useState("");

  const [sending, setSending] = useState(false);

  const [btn, setBtn] = useState("Send")

  console.log(value, address);

  const handleSend = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://eth-sepolia.g.alchemy.com/v2/5ejOeMx6mGi_9rffVgn0YtumPExotuVv"
    );
    const privateKey =
      "bdce382dcabad190cd8ac71afa8f8fe2079f57716adf0939725af430540d8438";
    const wallet = new ethers.Wallet(privateKey, provider);

    const transaction = {
      to: address,
      value: ethers.utils.parseEther(value),
      gasPrice: ethers.utils.parseUnits("20", "gwei"),
      gasLimit: 21000
    };

    try {
      const tx = await wallet.sendTransaction(transaction);
      setStatus(`Transaction sent: ${tx.hash}`);
      setBtn("confirming Pending...")
      await tx.wait();
      setStatus(`Transaction confirmed: ${tx.hash}`);
      setBtn("Send")
      setSending(false);
    } catch (err:any) {
      console.log(err);
      setStatus(`Transaction failed: ${err.message}}`);
      setBtn("Send")
      setSending(false);
    }
  };

  return (
    <SafeAreaView >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        style={{padding:16}}
        contentInsetAdjustmentBehavior="automatic">
        <View style={styles.app}>
          <View style={styles.title}><Text style={styles.title}>Ethers</Text></View>
          <TextInput
            style={styles.input}
            onChangeText={onChangeValue}
            keyboardType='numeric'
            value={value}
            placeholder="Value"
          />
          <TextInput
            style={styles.inpt}
            onChangeText={onChangeAddress}
            value={address}
            placeholder="Address"
          />
          <Button
            title={btn}
            onPress={() => {
              setSending(true);
              setBtn("Sending...")
              handleSend();
            }}
            disabled={sending}
          />
          <View style={styles.status}></View>
          <Text >{status}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  app: {
    marginHorizontal: "auto",
    maxWidth: 500
  },
  logo: {
    height: 80
  },
  header: {
    padding: 20
  },
  input:{
    borderWidth: 1,
    borderColor: "thistle",
    borderRadius: 10,
    padding:8,
    paddingHorizontal: 16,
    margin:4,
    fontSize:24,
    marginVertical: 16,
  },
  inpt:{
    borderWidth: 1,
    borderColor: "thistle",
    borderRadius: 10,
    marginVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize:24,
  },
  textInput:{
    fontSize: 32,
  },
  title: {
    fontWeight: "bold",
    margin: 16,
    fontSize:48,
    textAlign: "center"
  },
  text: {
    lineHeight: "1.5em",
    margin: 16,
    marginHorizontal:32,
    textAlign: "center"
  },
  link: {
    color: "#1B95E0"
  },
  status:{
    margin:32,
    fontSize: 32,
  },
  code: {
    fontFamily: "monospace, monospace"
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 48,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  }
});


export default App;
