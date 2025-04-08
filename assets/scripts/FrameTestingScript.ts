import { _decorator, Component, Label, Node } from "cc";
const { ccclass, property } = _decorator;
declare let window: any;
@ccclass("FrameTestingScript")
export class FrameTestingScript extends Component {
  @property(Label)
  addresstext: Label = null;

  configuration;
  start() {
    this.readyState();
    this.createConfiguration();
  }
  createConfiguration() {
    const connector = window?.miniAppConnector();
    this.configuration = window?.createConfig({
      chains: [window?.base], // make sure base is attached to window earlier
      connectors: [
        connector,
        // window?.injected({
        //   shimDisconnect: true,
        // }),
      ],
      transports: {
        [window?.base.id]: window?.http("https://mainnet.base.org"),
      },
    });
  }
  async readyState() {
    await window?.FrameSdk?.actions?.ready();
  }
  onConnectWallet() {
    console.log("Connect Wallet", this.configuration);
    this.configuration.connectors[0]
      .connect()
      .then((result) => {
        console.log("Connect Config Wagmi Result:", result);
        console.log("Connection result:", result);
        this.setAddress(result.accounts[0]);
      })
      .catch((e) => {
        this.setAddress(e.message);
      });
  }
  onDisConnectWallet() {
    console.log("Connect Wallet", this.configuration);
    this.configuration.connectors[0]
      .disconnect()
      .then((result) => {
        console.log("Connect Config Wagmi Result:", result);
        console.log("Connection result:", result);
        this.setAddress("Your Wallet Disconnected");
      })
      .catch((e) => {
        this.setAddress(e.message);
      });
  }
  setAddress(address: string) {
    this.addresstext.string = address;
  }

  update(deltaTime: number) {}
}
