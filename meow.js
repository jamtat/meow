var meow = {
    init: function() {
        meow.api(function(j) {
            meow.urls = j.cats
            meow.cycle()
        })
    },
    setCat: function(url) {
        document.getElementById('cat').style.backgroundImage = 'url('+url+')'
    },
	nextIndex: function() {
		var old = meow.index;
		meow.index = (meow.index+1)%meow.urls.length
		return old;
	},
    cycle: function() {
        var url = meow.urls[meow.nextIndex()],
            img = new Image()
        img.onload = function() {
            meow.setCat(url)
            setTimeout(meow.cycle, 2000)
        }
        img.src = url
    },
    api: function(callback, debug) {
		var req = new XMLHttpRequest()
		
		req.onload = function() {
			if(this.status === 200) {
				if(debug) {
	 				console.log(this)
	 				console.log(this.responseText)
	 				console.log(req.responseText)
	 				try {
	 					console.log(JSON.parse(req.responseText))
	 				} catch(e){}
				}
				if(callback) {
					callback(JSON.parse(req.responseText))
				}
			} else {
				console.error(this.status, this.statusText, this.responseText)
			}
		}
		req.open('GET', 'api/?count=100')
		req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
		req.send()
	},
    
    urls: [],
    index: 0
}


document.addEventListener('DOMContentLoaded', function(event) {
    meow.init()
})