
const Home = () =>{
    /** 
     * Static Home compponent for introduction
     */
    return (
        <div style={{display:'flex', flexDirection:'column', textAlign:'left', padding:20}}>
            <h1 style={{textAlign:'center'}}>Prodigal Frontend Assingment</h1>

            <section style={{padding:30}}>
                <h3>Part1 of the Assingment is available at <a href="../part1">./part1</a></h3>
                <ul style={{textAlign:'left'}}>
                    <li>Open the URL, then enter the filter details, like Agents and Call Duration range</li>
                    <li>Click on Filter which should be in blue color to search the Calls</li>
                    <li>Calls shall be listed in the table</li>
                    <li>Input Field is an Auto Search type Component</li>
                    <li>For agents not available in search won't be allowed to enter</li>
                </ul>
            </section>

            <section style={{padding:30}}>
                <h3>Part2 of the Assingment is available at <a href="../part2">./part2</a></h3>
                <ul style={{textAlign:'left'}}>
                    <li>Calls are listed in the table with Id and Tags</li>
                    <li>Click on Operate Labels to add remove or create labels</li>
                    <li>Slect the Calls to operate upon</li>
                    <li>removal of labels is allowed for all labels for an individual seleted row</li>
                    <li>for multiple selection only common labels are allowed to delete/remove</li>
                    <li>labels that shall be deleted are represented as red color tag/chip component</li>
                    <li>Labels can be added from the input filed, if available in dropdown than, label is added directly, else one can create a label by typing and selecting the same from dropdown</li>
                    <li>Click Change Labels to save the changes via the API call</li>
                </ul>
            </section>

            <section>
                <ol>
                    <li>Both the tables in each part supports pagination</li>
                    <li>Columns are sortable based on there content</li>
                    <li>Useed Ant Design for UI</li>
                    <li>Used other libraries like axios, react-router-dom for API and route settings respectively</li>
                </ol>
            </section>
        </div>
    );
}

export default Home;