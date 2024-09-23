const Mock = require('mockjs');
const NOTFOUND = {
  message: 'Not Found',
  documentation_url: 'http://localhost:8000/request',
};
function getRandomTransactions(n) {
  return Mock.mock({
    code: 200,
    msg: '请求成功',
    data: {
      [`list|${n}`]: [
        {
          'id|11232131234-31232131234': 11232131234,
          bcAddress: '@name', //交易这地址
          'blockGasLimit|100-400': 100,
          'blockHash|112321123131242331234-332321123131242331234': 112321123131242331234, //所属块  （更具区块hash跳转区块详情）
          'blockNumber|12221-22211': 12221,
          contractName: '@pick("fangsheng","warden","kath")',
          cumulativeGas: 1,
          'gas|100-200': 120,
          'gasPrice|20-40': 22,
          inputText: 'input text',
          method: 'method',
          params: 'params',
          pkHash: '@id@id', //哈希    （查询交易详情）
          'randomId|121231235-999999999': 222222222,
          timestamp: '@datetime("T")', //交易时间
          blockTimestamp: '@datetime("T")', //交易时间
          transactionFrom: '@name', //发送者
          'txnMoney|100-200': 120,
          contractAddress:
            '@pick("0x7f4c9ba6a56a76dc2f4e67f3b02a17e5472f872e","0xff75f6659c6afedda22de634a3a16784ed5ef433**", null)',
          transactionTo:
            '@pick("0x7f4c9ba6a56a76dc2f4e67f3b02a17e5472f872e","0xff75f6659c6afedda22de634a3a16784ed5ef433**", null)', //接受者
          version: 'version1',
          'bizData|100-200': 120,
          tradeStat: '@pick(0,1)',

          transactionIndex: 3,
          gasLimit: 3000000,
          gasPrice: 1.0,
          randomId: '0x4802832d23ae4349882ccbe04b99a3c8',
          contractAddress: '0xc506da4d9d77161a768372da5b985732dd74a702',
          contractName: null,
          contractVersion: null,
          method: 'store(string,string,string,string)',
          params: null,
          inputText: null,
          dagExecuteStatus: null,
        },
      ],
      total: 800,
      pageSize: 20, //每页多少条
      pageTotal: 40, //总页数
    },
  });
}
const getRandomBlocks = (n) => {
  return Mock.mock({
    code: 200,
    msg: '请求成功',
    data: {
      [`list|${n}`]: [
        {
          'id|11232131234-31232131234': 11232131234,
          'avgGasPrice|1-10': 3,

          detailInfo: 'detail info',
          extraData: 'extraData info',
          'gasLimit|100-400': 100,
          'gasUsed|1-20': 1,
          'genIndex|1-100': 2,
          miner: '@pick("fangsheng","warden","kath")',
          blockAreaInfo: '@pick("fangsheng","warden","kath")',

          'parentHash|11232131234-31232131234': 11232131234,
          'size|100-200': 120,
          'txn|20-40': 22,
          pkHash: '0x5a64844e39aeff7980b45eddde229565028ddfaa229f4e57fde6c8b82a351c12',
          'number|12221-22211': 12221,
          eventId: '0x041b25edfa5abaeaacea31d844613b2ddc870cb7599dcb076fdf3029aac25ecc',
          preEventId: '0x65585b88ef4869e97f39e84c838613407f951cf7f326b4ea8f574711d99526e0',
          epoch: 7,
          timestamp: '@datetime("T")',
          'evmTnxNum|20-240': 1,
          globalEventNum: 0,
          detailInfo: null,
        },
      ],
      total: 800,
      pageSize: 20, //每页多少条
      pageTotal: 40, //总页数
    },
  });
};

const queryBlockChain = (req, res) => {
  res.json({
    msg: '成功',
    data: {
      lastBlockNum: 2, //当前块高
      txnCount: 12, //交易总量
      pendingTxn: 123, //正在处理交易数
      epoch: 123, // pbft 当前视图
      avgTime: 12.2,
    },
    code: 200,
  });
};
const queryBlocks = (req, res) => {
  let database = [];
  let ps = req.body.pageSize || 25;
  database = getRandomBlocks(ps);
  let data = database;
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json(NOTFOUND);
  }
};
const globalSearch = (req, res) => {
  let database = [];
  let ps = req.body.size || 10;
  database = getSearchList(ps);
  let data = database;
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json(NOTFOUND);
  }
};
const queryBlockDetail = (req, res) => {
  res.status(200).json({
    msg: 'success',
    data: {
      id: 735014,
      number: 719025,
      pkHash: '0xdf8ffd67d8ac5714d8679e57603a7985a0e7dc3e5565259857b883b10f2ea36b',
      parentHash: '0x3d43788a1b203162019ca37bff2ecd399ef10974d932294028dab27e518c91df',
      genIndex: 0,
      size: 77,
      timestamp: 1535139337000,
      txn: 204,
      extraData: '0xdc809a312e312e302b2b306161342a524c696e75782f672b2b2f496e74',
      blockAreaInfo: '矿区4',

      eventId: '0x041b25edfa5abaeaacea31d844613b2ddc870cb7599dcb076fdf3029aac25ecc',
      preEventId: '0x65585b88ef4869e97f39e84c838613407f951cf7f326b4ea8f574711d99526e0',
      epoch: 7,
      evmTnxNum: 1090,
      globalEventNum: 0,
      detailInfo: null,
    },
    code: 200,
  });
};
const queryNotices = (req, res) => {
  let database = [];
  let ps = req.body.size || 10;
  database = getRandomNotice(ps);
  let data = database;
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json(NOTFOUND);
  }
};
function getRandomNotice(n) {
  return Mock.mock({
    code: 200,
    msg: '请求成功',
    data: [
      {
        id: 1,
        createUser: 'ww',
        remark: null,
        createTime: 1533804194000,
        version: 1,
        businessTime: null,
        noticeInfo:
          'Sponsored Link:   ivyKoin - Click to find out how this token will change banking and crypto payments.', //内容
        ifOnline: 1,
      },
    ],
  });
}
// 全局查找
const getSearchList = (n) => {
  return Mock.mock({
    msg: 'success',
    data: {
      type: '@pick([1,2])', //1为交易， 2为块
      searchType: function () {
        if (this.type === 1) return 'pkHash';
        if (this.type === 2) return 'bcAddress';
      }, //查找到的key
      searchValue: '0x165da6e137e8b0ef9cb31e3e26d4af3d1dbcc380', //查询的value
      list: function () {
        if (this.type === 1) {
          const res = getRandomTransactions(20);
          return res.data.list;
        }
        if (this.type === 2) {
          const res = getRandomBlocks(20);
          return res.data.list;
        }
      },
      totalCount: 800,
      pageSize: 20,
      pageTotal: 40,
    },
    code: 200,
  });
};
const queryTransactions = (req, res) => {
  res.status(200).json(getRandomTransactions(10));
};
const queryTransactionDetail = (req, res) => {
  res.status(200).json({
    msg: 'success',
    data: {
      id: 157315979,
      pkHash: '0x0e96a1296839adebb01ab8fc4121666e0c90be843ab972c9c364314e4a00ad93',
      bcAddress: '0x165da6e137e8b0ef9cb31e3e26d4af3d1dbcc380',
      blockHash: '0x726dc3b6bf130d7b17a743f5ab1c84ec3bcf08cf281e1cc9fc9d245c5b8832e6',
      blockNumber: 715517,
      blockTimestamp: 1535132004000,
      transactionIndex: 139,
      transactionFrom: '0x41b3423ca5d1ef50170abebd587d947320db7680',
      transactionTo: '0x165da6e137e8b0ef9cb31e3e26d4af3d1dbcc380',
      contractAddress: '0x2084563d55157bd39278a1f033eccc4d826f9c77',
      txnMoney: 28540996,

      gasLimit: 300000000,
      gasPrice: 0e-8,
      randomId: '0x1e4544047bb543719f64397c6599d21a',
      contractName: null,
      contractVersion: null,
      method: null,
      params: null,
      inputText: '0xaafa4c06',
      dagExecuteStatus: 'null',
    },
    code: 200,
  });
};
const queryTxnCount = (req, res) => {
  res.json(
    Mock.mock({
      msg: 'success',
      data: [
        {
          id: 130,
          pkDate: 1534348800000,
          txnCount: 1,
          gmtCreate: 1535126400000,
          gmtModify: 1535126400000,
        },
        {
          id: 1039,
          pkDate: 1534435200000,
          txnCount: 1276702,
          gmtCreate: 1535126400000,
          gmtModify: 1535212800000,
        },
        {
          id: 2043,
          pkDate: 1534521600000,
          txnCount: 922889,
          gmtCreate: 1535212800000,
          gmtModify: 1535212800000,
        },
        {
          id: 1040,
          pkDate: 1534608000000,
          txnCount: 883593,
          gmtCreate: 1535212800000,
          gmtModify: 1535212800000,
        },
        {
          id: 131,
          pkDate: 1534694400000,
          txnCount: 907194,
          gmtCreate: 1535212800000,
          gmtModify: 1535212800000,
        },
      ],
      code: 200,
    }),
  );
};
const queryBlockCount = (req, res) => {
  res.send({
    msg: '成功',
    code: 200,
    data: Mock.mock({
      'list|7': [
        {
          pkDate: function () {
            const diff = 7 - this.index;
            return Date.now() - diff * 1000 * 60 * 60 * 24;
          },
          bckn: '@integer(3000, 9000)',
          'index|+1': 1,
        },
      ],
    }),
  });
};
const queryContractDetail = (req, res) => {
  let database = getContract();
  let data = database.data;
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json(NOTFOUND);
  }
};
const getContract = () => {
  return Mock.mock({
    code: 200,
    msg: '请求成功',
    data: {
      contract: {
        name: 'DACCToken',
        version: 'v0.4.24+commit.e67f0147',
        optimization: 'no',
        runtime: '200',
        balance: '1NBD',
        value: '¥12000.000',
        Transactions: '8 txns',
        codeSoucre: `pragma solidity ^ 0.4.13;
        contract ERC20Basic {
            uint256 public totalSupply;
            function balanceOf(address who) public constant returns(uint256);
            function transfer(address to, uint256 value) public returns(bool);
            event Transfer(address indexed from, address indexed to, uint256 value);
        }

        contract ERC20 is ERC20Basic {
            function allowance(address owner, address spender) public constant returns(uint256);
            function transferFrom(address from, address to, uint256 value) public returns(bool success);
            function approve(address spender, uint256 value) public returns(bool);
            event Approval(address indexed owner, address indexed spender, uint256 value);
        }

        library SaferMath {
            function mul(uint256 a, uint256 b) internal constant returns(uint256) {
                uint256 c = a * b;
                assert(a == 0 || c / a == b);
                return c;
            }

            function div(uint256 a, uint256 b) internal constant returns(uint256) {
                // assert(b > 0); // Solidity automatically throws when dividing by 0
                uint256 c = a / b;
                // assert(a == b * c + a % b); // There is no case in which this doesn't hold
                return c;
            }

            function sub(uint256 a, uint256 b) internal constant returns(uint256) {
                assert(b <= a);
                return a - b;
            }

            function add(uint256 a, uint256 b) internal constant returns(uint256) {
                uint256 c = a + b;
                assert(c >= a);
                return c;
            }
        }

        contract BasicToken is ERC20Basic {
            using SaferMath
            for uint256;
            mapping(address = >uint256) balances;
            /**
        * @dev transfer token for a specified address
        * @param _to The address to transfer to.
        * @param _value The amount to be transferred.
        */
            function transfer(address _to, uint256 _value) public returns(bool) {
                require(_to != address(0));

                // SafeMath.sub will throw if there is not enough balance.
                balances[msg.sender] = balances[msg.sender].sub(_value);
                balances[_to] = balances[_to].add(_value);
                Transfer(msg.sender, _to, _value);
                return true;
            }

            /**
        * @dev Gets the balance of the specified address.
        * @param _owner The address to query the the balance of.
        * @return An uint256 representing the amount owned by the passed address.
        */
            function balanceOf(address _owner) public constant returns(uint256 balance) {
                return balances[_owner];
            }

        }

        contract StandardToken is ERC20,
        BasicToken {

            mapping(address = >mapping(address = >uint256)) allowed;

            /**
        * @dev Transfer tokens from one address to another
        * @param _from address The address which you want to send tokens from
        * @param _to address The address which you want to transfer to
        * @param _value uint256 the amount of tokens to be transferred
        */
            function transferFrom(address _from, address _to, uint256 _value) public returns(bool) {
                require(_to != address(0));

                uint256 _allowance = allowed[_from][msg.sender];

                // Check is not needed because sub(_allowance, _value) will already throw if this condition is not met
                // require (_value <= _allowance);
                balances[_from] = balances[_from].sub(_value);
                balances[_to] = balances[_to].add(_value);
                allowed[_from][msg.sender] = _allowance.sub(_value);
                Transfer(_from, _to, _value);
                return true;
            }

            /**
        * @dev Approve the passed address to spend the specified amount of tokens on behalf of msg.sender.
        *
        * Beware that changing an allowance with this method brings the risk that someone may use both the old
        * and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this
        * race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards:
        * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
        * @param _spender The address which will spend the funds.
        * @param _value The amount of tokens to be spent.
        */
            function approve(address _spender, uint256 _value) public returns(bool) {
                allowed[msg.sender][_spender] = _value;
                Approval(msg.sender, _spender, _value);
                return true;
            }

            /**
        * @dev Function to check the amount of tokens that an owner allowed to a spender.
        * @param _owner address The address which owns the funds.
        * @param _spender address The address which will spend the funds.
        * @return A uint256 specifying the amount of tokens still available for the spender.
        */
            function allowance(address _owner, address _spender) public constant returns(uint256 remaining) {
                return allowed[_owner][_spender];
            }

            /**
        * approve should be called when allowed[_spender] == 0. To increment
        * allowed value is better to use this function to avoid 2 calls (and wait until
        * the first transaction is mined)
        * From MonolithDAO Token.sol
        */
            function increaseApproval(address _spender, uint _addedValue) returns(bool success) {
                allowed[msg.sender][_spender] = allowed[msg.sender][_spender].add(_addedValue);
                Approval(msg.sender, _spender, allowed[msg.sender][_spender]);
                return true;
            }

            function decreaseApproval(address _spender, uint _subtractedValue) returns(bool success) {
                uint oldValue = allowed[msg.sender][_spender];
                if (_subtractedValue > oldValue) {
                    allowed[msg.sender][_spender] = 0;
                } else {
                    allowed[msg.sender][_spender] = oldValue.sub(_subtractedValue);
                }
                Approval(msg.sender, _spender, allowed[msg.sender][_spender]);
                return true;
            }
        }

        contract Ownable {
            address public owner;

            event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

            /**
        * @dev The Ownable constructor sets the original 'owner' of the contract to the sender
        * account.
        */
            function Ownable() {
                owner = msg.sender;
            }

            /**
        * @dev Throws if called by any account other than the owner.
        */
            modifier onlyOwner() {
                require(msg.sender == owner);
                _;
            }

            /**
        * @dev Allows the current owner to transfer control of the contract to a newOwner.
        * @param newOwner The address to transfer ownership to.
        */
            function transferOwnership(address newOwner) onlyOwner public {
                require(newOwner != address(0));
                OwnershipTransferred(owner, newOwner);
                owner = newOwner;
            }

        }

        contract DGD is StandardToken,
        Ownable {
            string public constant name = "DGD";
            string public constant symbol = "DGD";
            uint8 public constant decimals = 18;

            uint256 public DGDIssued;
            string public DGDTalk;

            event DGDTalked(string newWord);
            function talkToWorld(string talk_) public onlyOwner {
                DGDTalk = talk_;
                DGDTalked(DGDTalk);
            }

            event DGDsDroped(uint256 count, uint256 kit);
            function drops(address[] dests, uint256 DGDs) public onlyOwner {
                uint256 amount = DGDs * (10 * *uint256(decimals));
                require((DGDIssued + (dests.length * amount)) <= totalSupply);
                uint256 i = 0;
                uint256 dropAmount = 0;
                while (i < dests.length) {

                    if (dests[i].balance > 50 finney) {
                        balances[dests[i]] += amount;
                        dropAmount += amount;
                        Transfer(this, dests[i], amount);
                    }
                    i += 1;
                }
                DGDIssued += dropAmount;
                DGDsDroped(i, dropAmount);
            }

            function DGD() {
                totalSupply = 1000000 * (10 * *uint256(decimals));
                balances[msg.sender] = totalSupply;
                DGDIssued = totalSupply;
                DGDTalk = "DGD";
            }
        }`,
      },
    },
  });
};
export default {
  'POST /browser/thanos/block/queryBlockChain': queryBlockChain,
  'POST /browser/thanos/block/queryBlocks': queryBlocks,
  'POST /browser/thanos/block/globalSearch': globalSearch,
  'POST /browser/thanos/block/queryBlockDetail': queryBlockDetail,
  'POST /browser/thanos/block/notice/queryNotices': queryNotices,
  'POST /browser/thanos/block/queryTransactions': queryTransactions,
  'POST /browser/thanos/block/queryTransactionDetail': queryTransactionDetail,
  'POST /browser/thanos/block/queryTxnCount': queryTxnCount,
  'POST /browser/thanos/block/queryBlockCount': queryBlockCount,
  'POST /browser/thanos/block/queryContractDetail': queryContractDetail,
};
