 C = [{ time: Date.now(),
        body: 'foo'   }]

bC = b => C.push({   
                    time: Date.now(),
                    size: JSON.stringify(C).length,
                  height: C.length,
                  author: 'puukallistaja',
                    body: b,    
                })

fooBar = bC

fooBar('helloWorld')

require('fs').writeFileSync('./fooBar.json', JSON.stringify(C), 'utf8')