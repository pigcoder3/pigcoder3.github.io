#!/usr/bin/python3

from yattag import Doc, indent
import sys, os

website="https://seanmjohns.github.io/"
email="seanmjohns1@gmail.com"
github="seanmjohns"
linkedin="seanmjohns1"
source="https://github.com/seanmjohns/seanmjohns.github.io"
github_projects = "https://github.com/seanmjohns?tab=repositories"

linkedin_link="https://www.linkedin.com/in/seanmjohns1/"
github_link="https://github.com/seanmjohns"

images="images/"
projects="projects/"

def createdoc(name, isproject):
    doc, tag, text = Doc().tagtext()
    doc.asis('<!DOCTYPE html>');
    with tag('html'):
        with tag('head'):
            with tag('title'):
                if(isproject):
                    text(parseBasicInfo(name, 'name') + ' - Sean Johnson')
                if(name == "contact.html"):
                    text("Contact - Sean Johnson")
                if(name == "index.html"):
                    text("Projects - Sean Johnson")
            with tag('meta', name='viewport', content='width=device-width', charset='UTF-8'): pass
            if not isproject:
                with tag('script', type='text/javascript', src='stickynav.js'): pass
                with tag('link', rel='stylesheet', href='navbar.css'): pass
                with tag('link', rel='stylesheet', href='footer.css'): pass
            else:
                with tag('script', type='text/javascript', src='../../stickynav.js'): pass
                with tag('link', rel='stylesheet', href='../../navbar.css'): pass
                with tag('link', rel='stylesheet', href='../../project.css'): pass
                with tag('link', rel='stylesheet', href='../../footer.css'): pass
            if(name == "index.html"):
                with tag('link', rel='stylesheet', href='index.css'): pass
            if(name == "contact.html"):
                with tag('link', rel='stylesheet', href='contact.css'): pass
            
        with tag('body'):
            doc.asis(nameheader())
            doc.asis(navbar(isproject))
            with tag('div', id='primary'):
                if(name == "index.html"):
                    with tag('div', klass='content_container', id='intro'):
                        with tag('a', href=linkedin_link, title="linkedin"):
                            with tag('img', id='profile', src=images+'github-profile.png', alt='github profile'): pass
                        with tag('span', id='desc'):
                            text('I am an incoming Georgia Institute of Technology student who will major in computer science. I have been programming since age ten, and I will continue to do so as a software engineer for the rest of my life. My current focus is around Systems and Architecture as well as Information Internetworks.'); 
                    doc.asis(createprojectcontainers()) 
                if(name == "contact.html"): 
                    with tag('h2', id='contact-header'): 
                        text("Contact") 
                    with tag('div', klass='content-container', id='github', title="github"): 
                        with tag('a', href=github_link): 
                            with tag('img', src=images+'github-logo.png', id='github-logo'): 
                                pass 
                        with tag('span', klass='notes'): 
                            text('Contact me through GitHub (')
                            with tag('strong'): 
                                with tag('a', href=github_link, klass="intextlink"):
                                    text(github)
                            text(').')
                    with tag('div', klass='content-container', id='email', title="email"):
                        with tag('img', src=images+'email.png', id='email-logo'): pass
                        with tag('span', klass='notes'):
                            text('Email me at ')
                            with tag('strong'):
                                text(email)
                            text('.')
                    with tag('div', klass='content-container', id='linkedin', title="linkedin"):
                        with tag('a', href=linkedin_link):
                            with tag('img', src=images+'LI-In-Bug.png', id='linkedin-logo'): pass
                        with tag('span', klass='notes'):
                            text("Contact me through LinkedIn (")
                            with tag('strong'):
                                with tag('a', href=linkedin_link, klass="intextlink"):
                                    text(linkedin)
                            text(").")

                if(isproject):
                    with tag('h2', id='project-name'):
                        with tag("a", href=parseBasicInfo(name, "github")):
                            text(parseBasicInfo(name, "name"))
                    with tag('div', klass='content-container', id='intro'):
                        with tag('a', href=parseBasicInfo(name, "github")):
                            with tag('img', id='project-img', src=name+'.png'): pass
                        with tag('span', id='project-desc'):
                            text(parseBasicInfo(name, "longdesc"))
                    with tag('div', id='technical-info'):
                        with tag('div', klass='content-container', id='download'):
                            with tag('span', klass='subheader', id='download-header'):
                                text("Download")
                            with tag('div', klass='container-body'):
                                with tag('div', id='source'):
                                    with tag('span', id='source-header'):
                                        text('Source')
                                    with tag('a', href=parseBasicInfo(name, "github")+'/releases'):
                                        text('Github')
                                with tag('div', id='precompiled'):
                                    with tag('span', id='precompiled-header'):
                                        text('Compiled')
                                    if(parseBasicInfo(name, "compiled")):
                                        print(website+'projects/'+name+'/'+parseBasicInfo(name, "compiled"))
                                        with tag('a', href=website+'projects/'+name+'/'+parseBasicInfo(name, "compiled")):
                                            text(parseBasicInfo(name, "compiled"))
                                    else:
                                        with tag('a'):
                                            text("-")
                        with tag('div', klass='content-container', id='requirements'):
                            with tag('span', klass='subheader', id='requirements-header'):
                                text("Requirements")
                            with tag('div', klass='container-body'):
                                with tag('ul'):
                                    doc.asis(parseBasicInfo(name, "requirements"))
                    html = parseBasicInfo(name,'links')
                    if(html != "-" and html != None): #Only have links section if there are links to show
                        with tag('div', klass='content-container', id='links'):
                            with tag('span', klass='subheader', id='link-header'):
                                text("Links")
                            with tag('div', klass='container-body'):
                                with tag('ul'):
                                    doc.asis(parseBasicInfo(name,'links'))

                    with tag('h2', id="gallery-header"):
                        text("Gallery")
                    with tag('div', klass='content-container', id='gallery'):
                        with tag('button', id='left-button', klass='gallery-button', onclick="goLeft()"):
                            text(' < ')
                        with tag('div', id='image-container'):
                            with tag('div', id='image-number-container'):
                                with tag('span', id='image-number'):
                                    text("0 / 0")
                            if(os.path.isdir(projects+name+"/gallery")):
                                for imgname in os.listdir(projects+name+"/gallery"):
                                    if(os.path.isfile(projects+name+"/gallery/"+imgname) and imgname != ".DS_STORE"):
                                        with tag('img', klass='gallery-image', src='gallery/'+imgname): pass
                            with tag('span', id='no-images'):
                                text("It looks like we have no images for this project.")
                        with tag('button', id='right-button', klass='gallery-button', onclick='goRight()'):
                            text(' > ')
                        with tag('script', type='text/javascript', src='../../gallery.js'): pass
            doc.asis(footer(isproject))
            return(doc.getvalue())
#create the name header
def nameheader():
    doc, tag, text = Doc().tagtext();
    with tag('div'):
        with tag('h1', id='name'):    
            text('Sean Johnson')
    return indent(doc.getvalue())

#basic navbar in all pages
def navbar(isproject):
    doc, tag, text = Doc().tagtext();
    with tag('div', id='navbar'):
        with tag('div', id='projects-dropdown', klass='nav'):
            with tag('button', id='projects-dropdown-button', klass='nav-button', onclick='toggle()'):
                text("Projects");
            with tag('div', klass='projects-dd-content', id='dropdown-content'):
                for name in os.listdir(projects): #get all project directories
                    if(os.path.isdir(projects+name)):
                        if(isproject):
                            with tag('a', klass='project-link', href="../../"+projects+name+'/'+name+'.html'):
                                text(parseBasicInfo(name, "name"))
                        else:
                            with tag('a', klass='project-link', href=projects+name+'/'+name+'.html'):
                                text(parseBasicInfo(name, "name"))
        with tag('div', klass='nav'):
            if(isproject):
                with tag('a', klass='nav-button', href='../../index.html'):
                    text('Home')
            else:
                with tag('a', klass='nav-button', href='index.html'):
                    text('Home')
        with tag('div', klass='nav'):
            if(isproject):
                with tag('a', klass='nav-button', href='../../contact.html'):
                    text('Contact')
            else:
                with tag('a', klass='nav-button', href='contact.html'):
                    text('Contact')
    with tag('div', id='spacer'): pass
    with tag('script'):
        text("""function toggle() {
            var e = document.getElementById("dropdown-content");
            e.classList.toggle("projects-dd-content-shown");
        }

        window.onclick = function(event) {
              if (event.target != document.getElementById("projects-dropdown-button")) {
                document.getElementsByClassName("projects-dd-content")[0].classList.remove("projects-dd-content-shown");
            }
          }""")
    return doc.getvalue()

def footer(isproject):
    doc, tag, text = Doc().tagtext();
    extension = ""
    if isproject: extension="../../"
    with tag("div", id="footer"):
        with tag("div", id="centered"):
            with tag("div", id="footer-left"):
                with tag("div", id="footer-picture"):
                    doc.stag("img", id="footer-image", src=extension+"images/github-profile.png", width="75px", height="75px")
                with tag("div", id="footer-contact"):
                    with tag("ul", id="footer-contact-images"): #Github and linkedin
                        with tag("li"):
                            with tag("a", href=linkedin_link, width="75px", height="75px"):
                                doc.stag("img", id="contact-linkedin-image", alt="linkedin", klass="contact-image", src=extension+"images/black-linkedin-logo.png")
                        with tag("li"):
                            with tag("a", href=github_link, width="75px", height="75px"):
                                doc.stag("img", id="contact-github-image", alt="github", klass="contact-image", src=extension+"images/github-logo.png")
                    with tag("div", id="contact-email"):
                        text(email)
                with tag("div", id="web-source"):
                    with tag("a", id="source-link", href=source):
                        text("source")
            with tag("div", id="footer-right"): #Projects
                with tag("div", id="footer-projects"):
                    with tag("span", id="footer-projects-header"):
                        text("Projects")
                    with tag("ul", id="footer-projects-list"):
                        for name in os.listdir(projects): #get all project directories
                            if(os.path.isdir(projects+name)):
                                with tag("li"):
                                    with tag('a', href=extension+projects+name+'/'+name+'.html'):
                                        text(parseBasicInfo(name, "name"))
    return doc.getvalue()

#create home page project sneak-peeks
def createprojectcontainers():
    doc, tag, text = Doc().tagtext();    
    with tag('h2', id='projects_header'):
        with tag("a", href=github_projects):
            text('Projects')
    with tag('div', id='projects'):
        for name in os.listdir(projects): #Get all the projects so we can create sneak-peeks
            if(os.path.isdir(projects+name) and name != '.git'):
                with tag('div', klass='content_container project_container'):
                    with tag('a', href=projects+name+'/'+name+'.html'):
                        with tag('div', klass='project-desc-container'):
                            with tag('span', klass='project_name'):
                                text(parseBasicInfo(name, "name"))
                            with tag('span', klass='project_desc'):
                                text(parseBasicInfo(name, 'simpledesc'))
                        with tag('img', src=projects+name+'/'+name+'.png'): pass

    return doc.getvalue();

#gets info from project info files
def parseBasicInfo(filename, key):
    doc, tag, text = Doc().tagtext()
    output = "";
    input = "";

    with open("projects/"+filename+"/"+filename+".txt", "r") as f:
        while(1):
            input = f.readline();
            if(not input): 
                return "-"
            position = input.find(':')
            if(position > -1):
                if(input[:position] == key):
                    if(key == 'requirements'):
                        numberOfRequirements = 0
                        while(1):
                            input = f.readline().strip()
                            if(not input): 
                                print("Unclosed requirements key in '" + filename + "'")
                                exit()
                            if(input == ':requirements'): 
                                break
                            else:
                                with tag('li'):
                                    text(input.strip())
                                    numberOfRequirements+=1
                        if(numberOfRequirements == 0):
                            with tag('li'):
                                text("None")
                        return(indent(doc.getvalue()))
                    if(key == 'links'):
                        num_links = 0
                        while(1):
                            input = f.readline().strip()
                            if(not input):
                                print("Unclosed links key in '" + filename + "'")
                                exit()
                            if(input == ":links"):
                                break
                            else:
                                with tag('li'):
                                    pipe_index = input.index('|')
                                    if pipe_index > -1: #CANNOT use pipe character in link name
                                        with tag('a', href = str(input[pipe_index+1:])):
                                            text(input[:pipe_index])
                                            num_links+=1
                                    #else: pass
                        if num_links == 0:
                            return ""
                        return(indent(doc.getvalue()))
                    return input[position+1:].strip()
                            

def writeFile(name, isproject, doc):
    if(isproject):    
        with open("projects/"+name+'/'+name+'.html', 'w') as f:
            f.write(indent(doc))
    else:
        with open(name, 'w') as f:
            f.write(indent(doc))

def displayHelp():
    print("pagegen.py [projectname|htmlfilename|:projects:|:all:]")
    print(":projects: - regenerates all projects")
    print(":all: - regenerates all projects and base html files")
    print("    - includes the home page and contact page")

def main():

    #Handle arguments
    if len(sys.argv) == 1: #No names given
        displayHelp()

    for arg in sys.argv:

        name = arg

        #help message
        if name == "--help":
            displayHelp()

        #Regenerate all projects
        if name == ":projects:": #Note that `:` cannot be in a filename on macOS or windows (idk about linux)
            if(os.path.isdir(projects)):
                for filename in os.listdir(projects):
                    if(os.path.isdir(projects+filename)):
                        doc = createdoc(filename, True)
                        writeFile(filename, True, doc)
        
        #Regenerate everything (projects and html files)
        elif arg == ":all:":
            #projects
            if(os.path.isdir(projects)):
                for filename in os.listdir(projects):
                    if(os.path.isdir(projects+filename)):
                        doc = createdoc(filename, True)
                        writeFile(filename, True, doc)
            #html files
            for filename in os.listdir(projects):
                if (filename[len(filename)-5:len(filename)] != '.html'):
                    doc = createdoc(filename, False)
                    writeFile(filename, False, doc)
            
        #Regenerate one project
        elif(arg[len(arg)-5:len(arg)] != '.html'):
            if(os.path.isdir(projects+name)):
                doc = createdoc(name, True)
                writeFile(name, True, doc)

        #Attempting to (re)generate one html file (not project)
        else:
            if(os.path.isfile(name)):
                doc = createdoc(name, False)
                writeFile(name, False, doc)

if __name__ == "__main__":
    main()
