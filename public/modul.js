/**
 * @jsx React.DOM
 */

        var Formular = React.createClass({
            render: function() {
                return (
                  <div>
                    <AhojSvete/>
                    <NakupniSeznam/>
                  </div>
                );
              }    
        });

        var AhojSvete = React.createClass({
            zmenJmeno: function(jmeno){
                this.setState({
                    name: jmeno,
                    count: this.state.count + 1
                });
            },
            
            getInitialState: function(){
                return {
                    name: "Světe",
                    count: 0,
                }
            },
            
            render: function(){
                return (

                    <form>
                        <h1>Hello, {this.state.name} {this.state.count}!</h1>
                        <input type="radio" name="jmeno" value="Rosťa" defaultChecked="true" onClick={this.zmenJmeno.bind(this, "Rosťo")}/><span> Rosťa</span><br/>
                        <input type="radio" name="jmeno" value="Jarmila" onClick={this.zmenJmeno.bind(this, "Jarmilo")}/><span> Jarmila</span><br/>
                        <input type="radio" name="jmeno" value="Vilém" onClick={this.zmenJmeno.bind(this, "Viléme")}/><span> Vilém</span><br/>
                        <input type="radio" name="jmeno" value="Radana" onClick={this.zmenJmeno.bind(this, "Radano")}/><span> Radana</span><br/>
                    </form>
                );
            }
        });

        

        var List = React.createClass({
          render: function(){
            return (
              <ul>
              {
                this.props.items.map(function(item) {
                  return <li key={item}>{item}</li>
                })
               }
              </ul>
            )  
          }
        });


        var NakupniSeznam = React.createClass({
            getInitialState: function(){
                return {
                initialItems: [
                 "Apples",
                 "Granola",
                 "Broccoli",
                 "Chicken",
                 "Duck",
                 "Eggs",
                 "Fish",
                 "Hash Browns"
               ],
               items: [],
               ovoce: "whatever",
                }
            },
            filterList: function(event){
                var updatedList = this.state.initialItems;
                updatedList = updatedList.filter(function(item){
                    return item.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1
            });
            this.setState({items: updatedList});
            },
                        vzestupneList: function(){       
               this.state.initialItems.sort();
               this.setState();
            },
          
            sestupneList: function(){       
                this.state.items.sort();
                this.state.items.reverse();
                this.setState();
            },
            
            zmenOvoce: function(event){
                this.setState({
                    ovoce: event.target.value
                });
            },
            
            pridejOvoce: function(){ 
                this.state.initialItems.push(this.state.ovoce);
                this.setState();
            },
            
            componentWillMount: function(){
                this.setState({items: this.state.initialItems})
            },
            render: function(){
                return (

                    <form>
                        <div className="filter-list">
                            <input type="text" placeholder="Search" onChange={this.filterList}/><br/>
                            <input type="button" value="vzestupně " onClick={this.vzestupneList}/>
                            <input type="button" value=" sestupne" onClick={this.sestupneList}/>
                            <List items={this.state.items}/><br/>
                            <input ref = "ovocnyInput" type="text" name="ovoce" placeholder="Přidej ovoce" onChange={this.zmenOvoce}/><br/>
                            <input type="button" value="Přidej" onClick={this.pridejOvoce}/>
                        </div>
                    </form>
                );
            }
        });

        
        
        React.renderComponent(
            <Formular/>,
            document.getElementById('mount-point')
        );