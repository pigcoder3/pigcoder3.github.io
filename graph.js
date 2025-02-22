var node_color = "#cfcfcf";
var main_node_size = 150;
var main_node_color = "#9e9e9e";

var highlighted_color = node_color;
var highlighted_text_color = '#000000';
var highlighted_size = 125;
var unhighlighted_color = '#e0e0e0';
var unhighlighted_text_color = '#aaa';
var unhighlighted_size = 100;

var animation_duration = 150; // milliseconds

const colorMapping = new Map();
colorMapping.set('introduction', node_color);
colorMapping.set('software_coop','#83cbfa');
colorMapping.set('security_analyst','#ffa69e');
colorMapping.set('network_hardware','#9ee37d');
colorMapping.set('vulnerability_assessment','#fabc3c');
colorMapping.set('wild_track','#c879ff');

const baseNodeColorMapping = new Map();
baseNodeColorMapping.set('introduction', main_node_color);
baseNodeColorMapping.set('software_coop','#4a91d3');
baseNodeColorMapping.set('security_analyst','#FF675C');
baseNodeColorMapping.set('network_hardware','#6cc01e');
baseNodeColorMapping.set('vulnerability_assessment','#ff9d1c');
baseNodeColorMapping.set('wild_track','#BD47E5');

const cardBackground = new Map();
cardBackground.set('introduction', '#e9e9e9');
cardBackground.set('software_coop', '#A2D7FB');
cardBackground.set('security_analyst', '#FFBBB5');
cardBackground.set('network_hardware', '#B5EA9C');
cardBackground.set('vulnerability_assessment', '#FBCB6C');
cardBackground.set('wild_track', '#D59AFF');

function ColorLuminance(hex, lum) {

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}

['software_coop', 'security_analyst', 'network_hardware', 'wild_track', 'vulnerability_assessment'].forEach((proj_name) => {
    document.getElementById(proj_name).style="box-shadow: 10px 10px 0px 0px " + ColorLuminance(cardBackground.get(proj_name), -0.05) + "; border: solid 0px #efefef; background-color: " + cardBackground.get(proj_name) + ";";
    document.getElementById(proj_name + "_top").style="box-shadow: 10px 10px 0px 0px " + ColorLuminance(cardBackground.get(proj_name), -0.1) + "; border: solid 0px #efefef; background-color: " + ColorLuminance(cardBackground.get(proj_name), 0.1) + ";";
    //document.getElementById(proj_name).style="box-shadow: 0px 0px 50px 0px " + cardBackground.get(proj_name) + ";";
})

document.getElementById('introduction').style="box-shadow: 10px 10px 0px 0px " + ColorLuminance(cardBackground.get('introduction'), -0.05) + "; border: solid 0px #efefef; background-color: " + cardBackground.get('introduction') + ";";
document.getElementById("introduction_top").style="box-shadow: 10px 10px 0px 0px " + ColorLuminance(cardBackground.get('introduction'), -0.1) + "; border: solid 0px #efefef; background-color: " + ColorLuminance(cardBackground.get('introduction'), 0.065) + ";";
    
// document.getElementById('introduction').style="box-shadow: 0px 0px 50px 0px " + colorMapping.get(proj_name) + "; background-color: " + colorMapping.get(proj_name) + ";";
// document.getElementById('software_coop').style="box-shadow: 0px 0px 50px 0px " + colorMapping.get(proj_name) + "; background-color: " + colorMapping.get(proj_name) + ";";
// document.getElementById('security_analyst').style="box-shadow: 0px 0px 50px 0px " + colorMapping.get(proj_name) + "; background-color: " + colorMapping.get(proj_name) + ";";
// document.getElementById('network_hardware').style="box-shadow: 0px 0px 50px 0px " + colorMapping.get(proj_name) + "; background-color: " + colorMapping.get(proj_name) + ";";
// document.getElementById('vulnerability_assessment').style="box-shadow: 0px 0px 50px 0px " + colorMapping.get(proj_name) + "; background-color: " + colorMapping.get(proj_name) + ";";
// document.getElementById('wild_track').style="box-shadow: 0px 0px 50px 0px " + colorMapping.get(proj_name) + "; background-color: " + colorMapping.get(proj_name) + ";";

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
                'events': 'no',
                'ghost': 'yes',
                'ghost-offset-x': 5,
                'ghost-offset-y': 5,
                'ghost-opacity': 0.25

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
    { group: 'nodes', data: { label: 'Cybersecurity', id: 'cyber'}, classes: ['.base', 'software_coop', 'introduction', 'security_analyst', 'vulnerability_assessment'],
        style: { 'width': main_node_size, 'height': main_node_size, 'background-color': main_node_color, 'font-size': 15, 'font-weight': 'bold' } },
    { group: 'nodes', data: { label: 'Software Engineering', id: 'softeng'}, classes: ['.base', 'software_coop', 'introduction', 'wild_track'],
        style: { 'width': main_node_size, 'height': main_node_size, 'background-color': main_node_color, 'font-size': 15, 'font-weight': 'bold'} },
    { group: 'nodes', data: { label: 'UI/UX', id: 'ui/ux'}, classes: ['.base', 'introduction', 'wild_track'],
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
        classes: ['introduction', 'software_coop', 'network_hardware', 'security_analyst'] },
    { group: 'nodes', data: { label: 'Java', id: 'java'},
        classes: ['introduction', 'software_coop', 'vulnerability_assessment'] },
    { group: 'nodes', data: { label: 'C', id: 'clang'},
        classes: ['introduction', 'software_coop', 'security_analyst', 'vulnerability_assessment'] },
    { group: 'nodes', data: { label: 'C++', id: 'cpp'},
        classes: ['introduction', 'software_coop'] },
    { group: 'nodes', data: { label: 'Linux', id: 'linux'},
        classes: ['introduction', 'software_coop', 'network_hardware', 'security_analyst', 'vulnerability_assessment'] },
    { group: 'nodes', data: { label: 'APIs', id: 'api'},
        classes: ['introduction', 'software_coop', 'wild_track', 'network_hardware'] },
    { group: 'nodes', data: { label: 'Git', id: 'git'},
        classes: ['introduction', 'software_coop', 'wild_track'] },
    { group: 'nodes', data: { label: 'SQL', id: 'sql'},
        classes: ['introduction', 'software_coop', 'security_analyst', 'vulnerability_assessment'] },
    { group: 'nodes', data: { label: 'Ghidra', id: 'ghidra'},
        classes: ['introduction', 'software_coop', 'security_analyst'] },
    { group: 'nodes', data: { label: 'Bash', id: 'bash'},
        classes: ['introduction', 'software_coop', 'software_coop', 'security_analyst', 'vulnerability_assessment'] },
    { group: 'nodes', data: { label: 'Powershell', id: 'powershell'},
        classes: ['introduction', 'software_coop', 'security_analyst', 'vulnerability_assessment'] },
    { group: 'nodes', data: { label: 'Network Switch Configuration', id: 'configuration'},
        classes: ['introduction', 'network_hardware'] },
    { group: 'nodes', data: { label: 'Make', id: 'make'},
        classes: ['introduction'] },
    { group: 'nodes', data: { label: 'Maven', id: 'maven'},
        classes: ['introduction'] },
    { group: 'nodes', data: {label: 'Android', id: 'android'},
        classes: ['introduction', 'vulnerability_assessment']},

    // New ones to add for wildtrack
    { group: 'nodes', data: {label: 'Full Stack', id: 'full-stack'},
    classes: ['introduction', 'wild_track']},
    { group: 'nodes', data: {label: 'React', id: 'react'},
    classes: ['introduction', 'wild_track']},
    { group: 'nodes', data: {label: 'MongoDB', id: 'mongodb'},
    classes: ['introduction', 'wild_track']},
    { group: 'nodes', data: {label: 'Figma', id: 'figma'},
    classes: ['introduction', 'wild_track']}
    
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
    { group: 'edges', data: { id: 'bash-linux', source: 'bash', target: 'linux' } },
    { group: 'edges', data: { id: 'cyber-linux', source: 'cyber', target: 'linux' } },
    { group: 'edges', data: { id: 'nethard-linux', source: 'nethard', target: 'linux' } },
    { group: 'edges', data: { id: 'nethard-api', source: 'nethard', target: 'api' } },
    { group: 'edges', data: { id: 'softeng-api', source: 'softeng', target: 'api' } },
    /*{ group: 'edges', data: { id: 'python-api', source: 'python', target: 'api' } },*/
    { group: 'edges', data: { id: 'softeng-sql', source: 'softeng', target: 'sql' } },
    { group: 'edges', data: { id: 'softeng-git', source: 'softeng', target: 'git' } },
    { group: 'edges', data: { id: 'sql-inc_resp', source: 'sql', target: 'inc_resp' } },
    { group: 'edges', data: { id: 'malware_analysis-ghidra', source: 'malware_analysis', target: 'ghidra' } },
    /*{ group: 'edges', data: { id: 'inc_resp-elastic_kibana', source: 'inc_resp', target: 'elastic_kibana' } },*/
    { group: 'edges', data: { id: 'inc_resp-bash', source: 'inc_resp', target: 'bash' } },
    { group: 'edges', data: { id: 'inc_resp-powershell', source: 'inc_resp', target: 'powershell' } },
    { group: 'edges', data: { id: 'softeng-powershell', source: 'softeng', target: 'powershell' } },
    { group: 'edges', data: { id: 'softeng-bash', source: 'softeng', target: 'bash' } },
    { group: 'edges', data: { id: 'clang-make', source: 'clang', target: 'make' } },
    { group: 'edges', data: { id: 'nethard-configuration', source: 'nethard', target: 'configuration' } },
    { group: 'edges', data: { id: 'java-maven', source: 'java', target: 'maven' } },
    { group: 'edges', data: { id: 'java-android', source: 'java', target: 'android'}},

    // New ones for wildtrack
    { group: 'edges', data: { id: 'full-stack-softeng', source: 'softeng', target: 'full-stack' } },
    { group: 'edges', data: { id: 'react-softeng', source: 'softeng', target: 'react' } },
    { group: 'edges', data: { id: 'react-ui/ux', source: 'ui/ux', target: 'react' } },
    { group: 'edges', data: { id: 'mongodb-full-stack', source: 'full-stack', target: 'mongodb' } },
    { group: 'edges', data: { id: 'figma-ui/ux', source: 'ui/ux', target: 'figma'}}
]);






var selectedExperience = 0;

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
            x: -document.documentElement.clientWidth/6,
            y: 0
        });

        cy.zoom(cy.zoom()-0.1);
        
    }

}

experiences_and_projects = [

    { "element": document.getElementById("introduction"), "name": "introduction" },
    { "element": document.getElementById("software_coop"), "name": "software_coop" },
    { "element": document.getElementById("security_analyst"), "name": "security_analyst"},
    { "element": document.getElementById("network_hardware"), "name": "network_hardware"},
    { "element": document.getElementById("wild_track"), "name": "wild_track"},
    { "element": document.getElementById("vulnerability_assessment"), "name": "vulnerability_assessment"}

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

            selectedExperience = i;

            if(selectedExperience == 0) {
                up_button_area.style.opacity = 0.5;
                down_button_area.style.opacity = 1;
            } else if (selectedExperience == views.length - 1) {
                down_button_area.style.opacity = 0.5;
                up_button_area.style.opacity = 1;
            } else {
                down_button_area.style.opacity = 1;
                up_button_area.style.opacity = 1;
            }

            views[selectedExperience].scrollIntoView({behavior: 'smooth', block: (document.documentElement.clientWidth < 1000)?'start':'center'});

            // Update the cards too

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
                    backgroundColor: baseNodeColorMapping.get(proj_name),
                    backgroundOpacity: 1.0,
                    color: highlighted_text_color,
                    //width: highlighted_main_node_size,
                    //height: highlighted_main_node_size
                },

                duration: animation_duration

            });

            updated_nodes.difference(baseNodes).animate({

                style: { 
                    backgroundColor: colorMapping.get(proj_name),
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
                    backgroundColor: main_node_color,
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
    document.getElementById('software_coop').parentNode,
    document.getElementById("security_analyst").parentNode, 
    document.getElementById("network_hardware").parentNode,
    document.getElementById("wild_track").parentNode,
    document.getElementById("vulnerability_assessment").parentNode];

var left_button_area = document.getElementById("left_button_area");
var right_button_area = document.getElementById("right_button_area");
var down_button_area = document.getElementById("down_button_area");
var up_button_area = document.getElementById("up_button_area");
left_button_area.onclick = function () {

    // Rotate
    if (selectedExperience == 0) {

        return;

    }
    console.log("selectedExperience: " + selectedExperience);

    
    selectedExperience--;
    views[selectedExperience].scrollIntoView({behavior: 'smooth', block: (document.documentElement.clientWidth < 1000)?'start':'center'});
    right_button_area.style.opacity = 1;

    if(selectedExperience == 0) {
        left_button_area.style.opacity = 0.5;
    }

};
right_button_area.onclick = function () {

    // Rotate
    if (selectedExperience >= views.length - 1) {

        return;

    }
    console.log("selectedExperience: " + selectedExperience);

    selectedExperience++;
    views[selectedExperience].scrollIntoView({behavior: 'smooth', block: (document.documentElement.clientWidth < 1000)?'start':'center'});
    left_button_area.style.opacity = 1;

    if(selectedExperience == views.length - 1) {
        right_button_area.style.opacity = 0.5;
    }

};
up_button_area.onclick = function () {

    // Rotate
    if (selectedExperience == 0) {

        return;

    }
    console.log("selectedExperience: " + selectedExperience);

    selectedExperience--;
    views[selectedExperience].scrollIntoView({behavior: 'smooth', block: (document.documentElement.clientWidth < 1000)?'start':'center'});
    down_button_area.style.opacity = 1;

    if(selectedExperience == 0) {
        up_button_area.style.opacity = 0.5;
    }

};
down_button_area.onclick = function () {

    // Rotate
    if (selectedExperience >= views.length - 1) {

        return;

    }

    console.log("selectedExperience: " + selectedExperience);

    selectedExperience++;
    views[selectedExperience].scrollIntoView({behavior: 'smooth', block: (document.documentElement.clientWidth < 1000)?'start':'center'});
    up_button_area.style.opacity = 1;

    if(selectedExperience == views.length - 1) {
        down_button_area.style.opacity = 0.5;
    }

};

//Reset to the intro
views[0].scrollIntoView({behavior: 'smooth', block: 'center'});
left_button_area.style.opacity = 0.5;
right_button_area.style.opacity = 1;
up_button_area.style.opacity = 0.5;
down_button_area.style.opacity = 1;