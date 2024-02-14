function maxOfTwo(n1,n2) {

    if (n1 > n2) {
        return n1
    }
    else {
        return n2
    }

}

function maxOfArray(myArray) {
    let maxNum = myArray[0]

    for (let i in myArray) {
        if (myArray[i] > maxNum) {
            maxNum =  myArray[i] 
        }
    }

    return maxNum
}

function showProperties(movie) {

    console.log("List of keys")

    for (let key in movie) {

        console.log(`${key}`)
    }

    console.log("List of values")
    for (let key in movie) {

        console.log(`${movie[key]}`)
    }


}

const circle = {
    radius: 2,
    area: function() {
        return Math.PI * this.radius * this.radius
    }

    
}


const circle2 = {
    radius: 2,
    area: function() {
        return Math.PI * this.radius * this.radius
    },
    get radiusValue() {return this.radius},
    set radiusValue(value) {this.radius = value}
}

const circle3 = {
    radius: 2,
    area: function() {
        return Math.PI * this.radius * this.radius
    },
    getradiusValue: function() {return this.radius},
    setradiusValue: function(value) {this.radius = value}
}