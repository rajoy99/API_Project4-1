itemd = [
    {
      name: "Arto Hellas",
      description: "040-123456",
      id: 1,
      price: 900,
    },
    {
      name: "Ada Lovelace",
      description: "39-44-5323523",
      id: 2,
      price: 700,
    },
    {
      name: "Dan Abramov",
      description: "12-43-234345",
      id: 3,
      price: 300,
    },
    {
      name: "Mary Poppendieck",
      description: "39-23-6423122",
      id: 4,
    },
  ]

i=0 
for(i=0;i<4;i++){
    item=itemd[i]
    if(item.id===2){
        console.log(item.name)
    }
}