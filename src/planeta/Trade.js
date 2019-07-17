import React from "react";
import { Tx, Input, Output, Util } from "leap-core";
import Web3 from "web3";
import { toHex, bytesToHex, padLeft } from "web3-utils";
import { ecsign, hashPersonalMessage } from "ethereumjs-util";
const EARTH_ABI = require("./abis/earth.json");

const BN = Web3.utils.BN;
const SCRIPT =
  "608060405234801561001057600080fd5b50600436106100445760e060020a60003504637f565aab8114610049578063c521fbac1461011e578063e3fa500f146101c2575b600080fd5b61011c600480360360e081101561005f57600080fd5b813591602081013591810190606081016040820135602060020a81111561008557600080fd5b82018360208201111561009757600080fd5b803590602001918460018302840111602060020a831117156100b857600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092955050823593505050602081013563ffffffff16906040810135600160a060020a0390811691606001351661026d565b005b61011c6004803603602081101561013457600080fd5b810190602081018135602060020a81111561014e57600080fd5b82018360208201111561016057600080fd5b803590602001918460018302840111602060020a8311171561018157600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610797945050505050565b61011c600480360360408110156101d857600080fd5b81359190810190604081016020820135602060020a8111156101f957600080fd5b82018360208201111561020b57600080fd5b803590602001918460018302840111602060020a8311171561022c57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610937945050505050565b6000829050600081600160a060020a03166337ebbc038a6040518263ffffffff1660e060020a0281526004018082815260200191505060206040518083038186803b1580156102bb57600080fd5b505afa1580156102cf573d6000803e3d6000fd5b505050506040513d60208110156102e557600080fd5b50516040805160e160020a6331a9108f028152600481018c90529051919250828a0391731f89fb2199220a350287b162b9d0a330a2d2efad91829163a9059cbb91600160a060020a03881691636352211e91602480820192602092909190829003018186803b15801561035757600080fd5b505afa15801561036b573d6000803e3d6000fd5b505050506040513d602081101561038157600080fd5b50516040805160e060020a63ffffffff8516028152600160a060020a039092166004830152602482018690525160448083019260209291908290030181600087803b1580156103cf57600080fd5b505af11580156103e3573d6000803e3d6000fd5b505050506040513d60208110156103f957600080fd5b50506040805160e160020a6331a9108f028152600481018a905290518691600160a060020a038085169263a9059cbb9291851691636352211e916024808301926020929190829003018186803b15801561045257600080fd5b505afa158015610466573d6000803e3d6000fd5b505050506040513d602081101561047c57600080fd5b50516040805163ffffffff84811660e060020a028252600160a060020a039093166004820152918c1660248301525160448083019260209291908290030181600087803b1580156104cc57600080fd5b505af11580156104e0573d6000803e3d6000fd5b505050506040513d60208110156104f657600080fd5b81019080805190602001909291905050505084600160a060020a03166336c9c4578d8d8d6040518463ffffffff1660e060020a0281526004018084815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b8381101561057557818101518382015260200161055d565b50505050905090810190601f1680156105a25780820380516001836020036101000a031916815260200191505b50945050505050600060405180830381600087803b1580156105c357600080fd5b505af11580156105d7573d6000803e3d6000fd5b50505050600081600160a060020a03166337ebbc038b6040518263ffffffff1660e060020a0281526004018082815260200191505060206040518083038186803b15801561062457600080fd5b505afa158015610638573d6000803e3d6000fd5b505050506040513d602081101561064e57600080fd5b50516040805160e060020a63a983d43f028152600481018d905263ffffffff8c16830160248201529051919250600160a060020a0384169163a983d43f9160448082019260009290919082900301818387803b1580156106ad57600080fd5b505af11580156106c1573d6000803e3d6000fd5b5050505060648411806106da575060648963ffffffff16115b15610788576040805160e060020a63a9059cbb028152738db6B632D743aef641146DC943acb64957155388600482015263ffffffff8b1686016024820152905173f64ffbc4a69631d327590f4151b79816a193a8c691829163a9059cbb916044808201926020929091908290030181600087803b15801561075a57600080fd5b505af115801561076e573d6000803e3d6000fd5b505050506040513d602081101561078457600080fd5b5050505b50505050505050505050505050565b60006107b96001606060020a0319606060020a3002168363ffffffff610a3e16565b9050600160a060020a0381167356711111111111111111111111111111111115671461082a576040805160e560020a62461bcd0281526020600482015260156024820152605b60020a740e6d2cedccae440c8decae640dcdee840dac2e8c6d02604482015290519081900360640190fd5b6040805160e060020a6370a08231028152306004820152905173f64ffbc4a69631d327590f4151b79816a193a8c69160009183916370a08231916024808301926020929190829003018186803b15801561088357600080fd5b505afa158015610897573d6000803e3d6000fd5b505050506040513d60208110156108ad57600080fd5b50516040805160e060020a63a9059cbb028152306004820152602481018390529051919250600160a060020a0384169163a9059cbb916044808201926020929091908290030181600087803b15801561090557600080fd5b505af1158015610919573d6000803e3d6000fd5b505050506040513d602081101561092f57600080fd5b505050505050565b60006109596001606060020a0319606060020a3002168363ffffffff610a3e16565b9050600160a060020a038116735671111111111111111111111111111111111567146109ca576040805160e560020a62461bcd0281526020600482015260156024820152605b60020a740e6d2cedccae440c8decae640dcdee840dac2e8c6d02604482015290519081900360640190fd5b6040805160e060020a63a9059cbb028152738db6B632D743aef641146DC943acb64957155388600482015260248101859052905173f64ffbc4a69631d327590f4151b79816a193a8c691829163a9059cbb916044808201926020929091908290030181600087803b15801561090557600080fd5b60008060008084516041141515610a5b5760009350505050610b10565b50505060208201516040830151606084015160001a601b60ff82161015610a8057601b015b8060ff16601b14158015610a9857508060ff16601c14155b15610aa95760009350505050610b10565b6040805160008152602080820180845289905260ff8416828401526060820186905260808201859052915160019260a0808401939192601f1981019281900390910190855afa158015610b00573d6000803e3d6000fd5b5050506020604051035193505050505b9291505056fea165627a7a72305820feaf3bf059276dcc45b2f77ccb7777c0fc048cf6644a001ea38f4c7f6ccbcd6c0029";

window.ethjsutils = { ecsign, hashPersonalMessage };

/**
 * Passport data structure

+------------+------------+------------+-------------+
|20 bytes    | 4 bytes    | 4 bytes    | 4 bytes     |
|name str    | picId      | CO2 locked | CO2 emitted |
+------------+------------+------------+-------------+

*/

export default ({ metaAccount, web3, leap3 }) => {
  // generate from code
  const EARTH_ADDR = "0x9c1185a5c5e9fc54612808977ee8f548b2258d31";

  const USA_COLOR = 49156;
  const USB_COLOR = 49155;
  const LEAP_COLOR = 0;
  const CO2_COLOR = 2;
  const GOELLARS_COLOR = 3;

  window.startTrade = async () => {
    function updateCO2(passportData, amount = 10) {
      const n = new BN(passportData.replace("0x", ""), 16);
      n.iadd(new BN(amount));
      return padLeft(n.toString(16), 64);
    }

    async function hashAndSign(buffer, address, privateKey) {
      console.log("SIGN", buffer.toString("hex"));
      console.log("xxxx", hashPersonalMessage(buffer).toString("hex"));
      if (privateKey) {
        const { r, s, v } = ecsign(
          hashPersonalMessage(buffer),
          Buffer.from(privateKey.replace("0x", ""), "hex")
        );
        const full = Array.from(r)
          .concat(Array.from(s))
          .concat([v]);
        return bytesToHex(full);
      } else {
        return await web3.eth.personal.sign(buffer.toString(), address, null);
      }
    }

    const address = metaAccount
      ? metaAccount.address
      : (await web3.eth.getAccounts())[0];
    const privateKey = metaAccount && metaAccount.privateKey;
    const myPassportOutput = (await leap3.getUnspent(address, USA_COLOR))[0];

    const myPassport = myPassportOutput.output.data;
    const myPassportAfter = updateCO2(myPassport);
    console.log(myPassport, myPassportAfter);

    const signedPassport = await hashAndSign(
      Buffer.from(myPassport.replace("0x", "") + myPassportAfter, "hex"),
      address,
      privateKey
    );

    const receipt = [
      padLeft(toHex(USA_COLOR), 4),
      padLeft(address, 40),
      padLeft(myPassportAfter, 64),
      padLeft(signedPassport, 130)
    ].map(x => x.replace("0x", ""));
    console.log(receipt.join(""));
  };

  window.finalizeTrade = async receipt => {
    const address = metaAccount
      ? metaAccount.address
      : (await web3.eth.getAccounts())[0];

    const privateKey = metaAccount && metaAccount.privateKey;

    function unpackReceipt(receipt) {
      const passportColor = parseInt(receipt.substr(0, 4), 16);
      const address = "0x" + receipt.substr(4, 40).toLowerCase();
      const passportData = receipt.substr(44, 64);
      const signature = "0x" + receipt.substr(108);
      const r = signature;

      return { passportColor, address, passportData, signature };
    }
    console.log(unpackReceipt(receipt));
    const their = unpackReceipt(receipt);

    console.log("0x" + their.address, parseInt(their.passportColor, 16));

    const theirPassportOutput = (await leap3.getUnspent(
      their.address,
      their.passportColor
    ))[0];

    const theirPassportDataBefore = theirPassportOutput.output.data.replace(
      "0x",
      ""
    );
    console.log(theirPassportDataBefore, their.passportData);
    const buffer = Buffer.from(
      theirPassportDataBefore + their.passportData,
      "hex"
    );

    //console.log("VERIFY", buffer.toString("hex"));
    //console.log("xxxx", hashPersonalMessage(buffer).toString("hex"));

    //const theirAccount = await web3.eth.personal.ecRecover(
    //  buffer.toString(),
    //  their.signature
    //);

    //console.log(theirAccount);

    //if (theirAccount != their.address) {
    //  throw "ecsignature doesn't match sender";
    //}

    const leapOutput = (await leap3.getUnspent(EARTH_ADDR, LEAP_COLOR))[0];
    const co2Output = (await leap3.getUnspent(EARTH_ADDR, CO2_COLOR))[0];
    const goellarsOutput = (await leap3.getUnspent(
      EARTH_ADDR,
      GOELLARS_COLOR
    ))[0];

    const myPassportOutput = (await leap3.getUnspent(address, USA_COLOR))[1];

    const condition = Tx.spendCond(
      [
        new Input({ prevout: leapOutput.outpoint, script: Buffer.from(SCRIPT, "hex") }),
        new Input({ prevout: co2Output.outpoint }),
        new Input({ prevout: goellarsOutput.outpoint }),
        new Input({ prevout: theirPassportOutput.outpoint }),
        new Input({ prevout: myPassportOutput.outpoint })
      ],
      []
    );

    console.log(
        theirPassportOutput.output.value,
        "0x" + their.passportData,
        their.signature,
        myPassportOutput.output.value,
        10,
        "0x3378420181474D3aad9579907995011D6a545E3D",
        "0x3378420181474D3aad9579907995011D6a545E3D"
      )

    const earthContract = new web3.eth.Contract(EARTH_ABI);
    const data = await earthContract.methods
      .trade(
        theirPassportOutput.output.value,
        "0x" + their.passportData,
        their.signature,
        myPassportOutput.output.value,
        10,
        "0x3378420181474D3aad9579907995011D6a545E3D",
        "0x3378420181474D3aad9579907995011D6a545E3D"
      )
      .encodeABI();
    condition.inputs[0].setMsgData(data);

    condition.sign([null, null, null, null, privateKey]);

    console.log(condition.hex(), data);

    const { outputs } = await new Promise((resolve, reject) => {
      leap3.currentProvider.send(
        {
          jsonrpc: "2.0",
          id: 42,
          method: "checkSpendingCondition",
          params: [condition.hex()]
        },
        (err, response) => {
          console.log("asdasdasd", err, response);
          if (err) {
            return reject(err);
          }
          return resolve(response.result);
        }
      );
    });

    console.log(outputs);

  };

  window.bufferfrom = Buffer.from;
  return <div>hell0</div>;
};
