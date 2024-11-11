import logo from './logo.svg';
import './App.css';

const edgeDelimiter = ":";
const mainNodes = ['Software Engineering', 'Network Hardware Support', 'Cybersecurity', 'UI/UX'];
const nodeQueue = []
const usedNodes = [];

nodeQueue.push(mainNodes[0]);
nodeQueue.push(mainNodes[1]);
nodeQueue.push(mainNodes[2]);

const edges = ['Cybersecurity;Incident Response',
                'Cybersecurity;Malware Analysis',
                'Malware Analysis;Assembly',
                'C;Ghidra',
                'Software Engineering;C',
                'Software Engineering;Python',
                'Software Engineering;C++',
                'Software Engineering;Java',
                'Network Hardware Support;Python',
                'Software Engineering;Linux',
                'Cybersecurity;Linux',
                'Network Hardware Support;Linux',
                'Network Hardware Support;APIs',
                'Software Engineering;APIs',
                'Python;APIs',
                'Software Engineering;SQL',
                'Software Engineering;Git',
                'SQL;Incident Response',
                'Malware Analysis;Ghidra',
                'Incident Response;Elastic/Kibana',
                'Incident Response;Bash',
                'Incident Response;Powershell',
                'Incident Response;Kali Linux',
                'Software Engineering;Powershell',
                'Software Engineering;Bash',
                'C;Make',
                'Network Hardware;Configuration',
                'Java;Maven',
                'Java;Android'
];

const grid = [];

function mainNode( { name } ) {

  return (

    <div className="mainNode">
        <p>{name}</p>
    </div>

  )

}

function Node( { name } ) {

  return (

    <div className="skillNode">
        <p>{name}</p>
    </div>

  )

}

function graphExplore(node) {

  edges.forEach((edge) => {

      console.log(edge);

      // Determine if we should branch from here
      if (node == edge.split(edgeDelimiter)[0]) {
          
          // Calculate desired position on graph
          // HOW???
          var positionX = 0;
          var positionY = 0;
          nodeQueue.push(edge.split(edgeDelimiter)[1]);

          var newNode = Node(node, 0, positionX, positionY);

          usedNodes.push(newNode);
      
          console.log(edge);
          
      }
      

  })

}

function generateGraph() {

  while (nodeQueue.length != 0) {

      var node = nodeQueue.shift();
      usedNodes.push(node);

      graphExplore(node);

  }

  return usedNodes;

}


function App() {
  return (
    <div className="App">
      { generateGraph() }
      <Node />
    </div>
  );
}



export default App;
