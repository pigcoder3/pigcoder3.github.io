var node_color = "#bfbfbf";
var main_node_size = 150;
var main_node_color = "#9e9e9e";

var highlighted_color = node_color;
var highlighted_text_color = '#000000';
var highlighted_size = 125;
var unhighlighted_color = '#e0e0e0';
var unhighlighted_text_color = '#aaa';
var unhighlighted_size = 100;

var animation_duration = 150; // milliseconds

var cy = cytoscape({

    container: document.getElementById('cy'), // container to render in

    elements: [ // list of graph elements to start with
    ],

    style: [ // the stylesheet for the graph

        {
            selector: '.base',
            style: {
                'background-color': main_node_color,
                'font-size': 15,
                'width': main_node_size,
                'height': main_node_size,
                'events': 'no'

            }

        },

        {
            selector: 'node',
            style: {
                'background-color': node_color,
                'label': 'data(label)',
                'border-width': 2,
                'border-color': '#efefef',
                'width': unhighlighted_size,
                'height': unhighlighted_size,
                'text-valign': 'center',
                'text-halign': 'center',
                'text-max-width': 80,
                'text-wrap': 'wrap',
                'font-size': 13,
                'font-family': ['verdana', 'sans-serif'],
                'events': 'no'

            }
        },

        {
            selector: 'edge',
            style: {
                'width': 3,
                'line-color': '#ccc',
                'target-arrow-color': '#ccc',
                'target-arrow-shape': 'none',
                'curve-style': 'bezier',
                'events': 'no'
            }
        }
    ],

    layout: {
        name: 'random'
    },

    boxSelectionEnabled: false,
    userPanningEnabled: true,
    userZoomingEnabled: false,
    autoungrabify: true,
    autounselectify: true

});

// Define all nodes

cy.add([
    { group: 'nodes', data: { label: 'Network Hardware Support', id: 'nethard'}, classes: ['.base', 'introduction', 'network_hardware'],
        style: { 'width': main_node_size, 'height': main_node_size, 'background-color': main_node_color, 'font-size': 15, 'font-weight': 'bold'} },
    { group: 'nodes', data: { label: 'Cybersecurity', id: 'cyber'}, classes: ['.base', 'introduction', 'security_analyst'],
        style: { 'width': main_node_size, 'height': main_node_size, 'background-color': main_node_color, 'font-size': 15, 'font-weight': 'bold' } },
    { group: 'nodes', data: { label: 'Software Engineering', id: 'softeng'}, classes: ['.base', 'introduction', 'platform_transition'],
        style: { 'width': main_node_size, 'height': main_node_size, 'background-color': main_node_color, 'font-size': 15, 'font-weight': 'bold'} }
]);

cy.add([
    { group: 'nodes', data: { label: 'Incident Response', id: 'inc_resp'},
        classes: ['introduction', 'security_analyst'] },
    { group: 'nodes', data: { label: 'Malware Analysis', id: 'malware_analysis'},
        classes: ['introduction', 'security_analyst'] },
    { group: 'nodes', data: { label: 'Assembly', id: 'assembly'},
        classes: ['introduction', 'security_analyst'] },
    { group: 'nodes', data: { label: 'Python', id: 'python'},
        classes: ['introduction', 'platform_transition', 'network_hardware', 'security_analyst'] },
    { group: 'nodes', data: { label: 'Java', id: 'java'},
        classes: ['introduction'] },
    { group: 'nodes', data: { label: 'C', id: 'clang'},
        classes: ['introduction', 'security_analyst'] },
    { group: 'nodes', data: { label: 'C++', id: 'cpp'},
        classes: ['introduction'] },
    { group: 'nodes', data: { label: 'Linux', id: 'linux'},
        classes: ['introduction', 'platform_transition', 'network_hardware', 'security_analyst'] },
    { group: 'nodes', data: { label: 'APIs', id: 'api'},
        classes: ['introduction', 'platform_transition', 'network_hardware'] },
    { group: 'nodes', data: { label: 'Git', id: 'git'},
        classes: ['introduction', 'platform_transition'] },
    { group: 'nodes', data: { label: 'SQL', id: 'sql'},
        classes: ['introduction', 'security_analyst'] },
    { group: 'nodes', data: { label: 'Ghidra', id: 'ghidra'},
        classes: ['introduction', 'security_analyst'] },
    { group: 'nodes', data: { label: 'Elastic/Kibana', id: 'elastic_kibana'},
        classes: ['introduction', 'security_analyst'] },
    { group: 'nodes', data: { label: 'Kali Linux', id: 'kali_linux'},
        classes: ['introduction', 'security_analyst'] },
    { group: 'nodes', data: { label: 'Bash', id: 'bash'},
        classes: ['introduction', 'security_analyst', 'platform_transition'] },
    { group: 'nodes', data: { label: 'Powershell', id: 'powershell'},
        classes: ['introduction', 'security_analyst'] },
    { group: 'nodes', data: { label: 'Network Switch Configuration', id: 'configuration'},
        classes: ['introduction', 'network_hardware'] },
    { group: 'nodes', data: { label: 'Make', id: 'make'},
        classes: ['introduction'] },
    { group: 'nodes', data: { label: 'Maven', id: 'maven'},
        classes: ['introduction'] }
]);


// Define all edges between the nodes

cy.add([
    
    { group: 'edges', data: { id: 'cyber-inc_resp', source: 'cyber', target: 'inc_resp' } },
    { group: 'edges', data: { id: 'cyber-malware_analysis', source: 'cyber', target: 'malware_analysis' } },
    { group: 'edges', data: { id: 'malware_analysis-assembly', source: 'malware_analysis', target: 'assembly' } },
    { group: 'edges', data: { id: 'clang-ghidra', source: 'clang', target: 'ghidra' } },
    { group: 'edges', data: { id: 'softeng-clang', source: 'softeng', target: 'clang' } },
    { group: 'edges', data: { id: 'softeng-python', source: 'softeng', target: 'python' } },
    { group: 'edges', data: { id: 'softeng-cpp', source: 'softeng', target: 'cpp' } },
    { group: 'edges', data: { id: 'softeng-java', source: 'softeng', target: 'java' } },
    { group: 'edges', data: { id: 'nethard-python', source: 'nethard', target: 'python' } },
    { group: 'edges', data: { id: 'softeng-linux', source: 'softeng', target: 'linux' } },
    { group: 'edges', data: { id: 'cyber-linux', source: 'cyber', target: 'linux' } },
    { group: 'edges', data: { id: 'nethard-linux', source: 'nethard', target: 'linux' } },
    { group: 'edges', data: { id: 'nethard-api', source: 'nethard', target: 'api' } },
    { group: 'edges', data: { id: 'softeng-api', source: 'softeng', target: 'api' } },
    { group: 'edges', data: { id: 'python-api', source: 'python', target: 'api' } },
    { group: 'edges', data: { id: 'softeng-sql', source: 'softeng', target: 'sql' } },
    { group: 'edges', data: { id: 'softeng-git', source: 'softeng', target: 'git' } },
    { group: 'edges', data: { id: 'sql-inc_resp', source: 'sql', target: 'inc_resp' } },
    { group: 'edges', data: { id: 'malware_analysis-ghidra', source: 'malware_analysis', target: 'ghidra' } },
    { group: 'edges', data: { id: 'inc_resp-elastic_kibana', source: 'inc_resp', target: 'elastic_kibana' } },
    { group: 'edges', data: { id: 'inc_resp-bash', source: 'inc_resp', target: 'bash' } },
    { group: 'edges', data: { id: 'inc_resp-powershell', source: 'inc_resp', target: 'powershell' } },
    { group: 'edges', data: { id: 'inc_resp-kali_linux', source: 'inc_resp', target: 'kali_linux' } },
    { group: 'edges', data: { id: 'softeng-powershell', source: 'softeng', target: 'powershell' } },
    { group: 'edges', data: { id: 'softeng-bash', source: 'softeng', target: 'bash' } },
    { group: 'edges', data: { id: 'clang-make', source: 'clang', target: 'make' } },
    { group: 'edges', data: { id: 'nethard-configuration', source: 'nethard', target: 'configuration' } },
    { group: 'edges', data: { id: 'java-maven', source: 'java', target: 'maven' } }

]);







cy.layout({name: 'cola', 
    animate: true, 
    randomize: true,
    avoidOverlap: true,
    nodeSpacing: function( node ){ return 30; }, 
    edgeLength: 50,
    edgeJaccardLength: 50,
    unconstrIter: 50,
    allConstIter: 50,
    fit: true
}).run();



window.addEventListener('resize', resized);


function resized() {
    document.getElementById("cy").height = document.documentElement.clientHeight;


    if (document.documentElement.clientWidth < 1000) {
    
        cy.userZoomingEnabled(true);

        cy.fit();

        cy.panBy({
                x: 0,
                y: -document.documentElement.clientHeight/5
        });

        cy.zoom(cy.zoom()-0.1);

    } else {

        cy.userZoomingEnabled(false);

        cy.fit();

        cy.panBy({
            x: -document.documentElement.clientWidth/5,
            y: 0
        });

        cy.zoom(cy.zoom()-0.1);
        
    }

}

experiences_and_projects = [

    { "element": document.getElementById("introduction"), "name": "introduction" },
    { "element": document.getElementById("security_analyst"), "name": "security_analyst"},
    { "element": document.getElementById("network_hardware"), "name": "network_hardware"},
    { "element": document.getElementById("platform_transition"), "name": "platform_transition"}

]

current_proj = null;

selectedNodes = cy.nodes();/*.filter( function(ele, i, eles) {

    return !ele.hasClass(".base");

});*/

baseNodes = cy.nodes().filter( function(ele, i, eles) {

    return ele.hasClass(".base");

});

function highlight_nodes(direction) {

    var metric = 0;

    if (direction == 0) {

        metric = document.documentElement.clientHeight;

    } else if (direction == 1) {

        metric = document.documentElement.clientWidth;

    }



    for (var i = 0; i < experiences_and_projects.length; i++) {

        proj = experiences_and_projects[i];

        e = proj["element"];
        proj_name = proj["name"];

        pos = 0;
        if (direction == 0) {
            pos = Math.round(e.getBoundingClientRect().top - metric/2);
        } else if (direction == 1) {
            pos = Math.round(e.getBoundingClientRect().left - metric/2);
        }

        if (pos < 0 && pos > -metric) {

            if (current_proj == proj) {
                break;
            }


            updated_nodes = cy.nodes().filter( function(ele, i, eles) {
                //if (ele.hasClass(".base")) { return false; } // No main nodes!!
                return ele.hasClass(proj_name);
            });
            new_nodes = updated_nodes.union(selectedNodes).difference(selectedNodes);

            same_nodes = selectedNodes.intersection(updated_nodes); // don't do anything with these
            old_nodes = selectedNodes.difference(new_nodes).difference(same_nodes);
            selectedNodes = updated_nodes;

            updated_nodes.intersection(baseNodes).animate({

                style: { 
                    //backgroundColor: highlighted_color,
                    backgroundOpacity: 1.0,
                    color: highlighted_text_color,
                    //width: highlighted_main_node_size,
                    //height: highlighted_main_node_size
                },

                duration: animation_duration

            });

            updated_nodes.difference(baseNodes).animate({

                style: { 
                    backgroundColor: highlighted_color,
                    backgroundOpacity: 1.0,
                    color: highlighted_text_color,
                    width: highlighted_size,
                    height: highlighted_size
                },

                duration: animation_duration

            });

            updated_nodes.difference(baseNodes).css('font-weight', 'bold');

            old_nodes.intersection(baseNodes).animate({

                style: {
                    //backgroundColor: unhighlighted_color,
                    backgroundOpacity: 0.25,
                    color: unhighlighted_text_color,
                    //width: main_node_size,
                    //height: main_node_size
                },

                duration: animation_duration

            });

            old_nodes.difference(baseNodes).css('font-weight', 'normal');

            old_nodes.difference(baseNodes).animate({

                style: {
                    backgroundColor: unhighlighted_color,
                    backgroundOpacity: 0.25,
                    color: unhighlighted_text_color,
                    width: unhighlighted_size,
                    height: unhighlighted_size,
                },

                duration: animation_duration

            });
            current_proj = proj;

            break;

        }

    }
}

// Highlighting nodes for big screens
window.addEventListener("scroll", (event) => {

    if(document.documentElement.clientWidth < 1000) { return; }
    highlight_nodes(0);

});


// Highlighting nodes for small screens
document.getElementById("content_area").addEventListener("scroll", (event) => {

    if(document.documentElement.clientWidth > 1000) { return; }
    highlight_nodes(1);

});

// Move the graph to the left so that it doesn't get hidden by the experiences
document.getElementById('platform_transition_link').onclick = function (e) {
    document.getElementById("platform_transition").scrollIntoView({
        behavior: 'smooth'
    });
};

cy.on('layoutstop', delay);

function delay() {
    setTimeout(function() {
        resized();
        highlight_nodes();
    }, 0);
}

if (document.readyState == 'complete') {
    delay();
} else {
    document.onreadystatechange = function () {
        if (document.readyState === "complete") {
            delay();
        }
    }
}



// For smaller screens, have left and right buttons
views = [document.getElementById("introduction").parentNode, 
    document.getElementById("security_analyst").parentNode, 
    document.getElementById("network_hardware").parentNode,
    document.getElementById("platform_transition").parentNode];
var selectedExperience = 0;
var left_button_area = document.getElementById("left_button_area");
var right_button_area = document.getElementById("right_button_area");
left_button_area.onclick = function () {

    // Rotate
    if (selectedExperience == 0) {

        return;

    }

    
    selectedExperience--;
    views[selectedExperience].scrollIntoView({behavior: 'smooth', block: 'start'});
    right_button_area.style.opacity = 1;

    if(selectedExperience == 0) {
        left_button_area.style.opacity = 0.5;
    }

};
right_button_area.onclick = function () {

    // Rotate
    if (selectedExperience >= views.length-1) {

        return;

    }

    selectedExperience++;
    views[selectedExperience].scrollIntoView({behavior: 'smooth', block: 'start'});
    left_button_area.style.opacity = 1;

    if(selectedExperience == views.length-1) {
        right_button_area.style.opacity = 0.5;
    }

};
//Reset to the intro
views[0].scrollIntoView({behavior: 'smooth', block: 'start'});
left_button_area.style.opacity = 0.5;
