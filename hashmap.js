class HashMap {
    constructor(loadFactor = 0.75, capacity = 16) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.size = 0; // Number of stored key-value pairs
        this.buckets = Array.from({ length: capacity }, () => []);// Array of buckets
    }

    hash(key) {
        const stringKey = String(key);
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < stringKey.length; i++) {
          hashCode = (primeNumber * hashCode + stringKey.charCodeAt(i)) % this.capacity;
        }
     
        return hashCode;
    }

    set(key, value) {
        const hashIndex = this.hash(key);
        let pairs = this.buckets[hashIndex];

        for(let pair of pairs) {
            if (pair[0] === key) {
                pair[1] = value;
                return;
            }
        }

        pairs.push([key, value]);
        this.size ++;
        
        
        if (this.currentLoad() > this.loadFactor) {
            this.resize();
        }
    }

    get(key) {
        const hashIndex = this.hash(key);
        const pairs = this.buckets[hashIndex];
        for(let pair of pairs) {
            if (pair[0] === key) {
                return pair[1]
            }
        }
        return null;
    }
    
    has(key) {
        const hashIndex = this.hash(key);
        let pairs = this.buckets[hashIndex];
        for(let pair of pairs) {
            if (pair[0] === key) {
                return true;
            }
        }
        return false;
    }

    remove(key) {
        const hashIndex = this.hash(key);
        let pairs = this.buckets[hashIndex];
        for(let i = 0; i < pairs.length; i++) {
            if(pairs[i][0] === key) {
                pairs.splice(i, 1);
                this.size--;
                return true;
            }
        }
        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        this.capacity = 16;
        this.buckets = Array.from({ length: this.capacity }, () => []);
        this.size = 0;
    }

    //returns array of all the keys inside the hash map
    keys() {
        let allKeys = [];
        for(let bucket of this.buckets) {
            for(let pair of bucket){
                allKeys.push(pair[0]);
            }
        }
        return allKeys;
    }

    values() {
        let allValues = [];
        for(let bucket of this.buckets) {
            for(let pair of bucket){
                allValues.push(pair[1]);
            }
        }
        return allValues;
    }

    entries() {
        let allEntries = [];
        for(let bucket of this.buckets) {
            for(let pair of bucket){
                allEntries.push(pair);
            }
        }
        return allEntries;
    }

    print() {
        console.log(`HashMap (capacity: ${this.capacity}, size: ${this.size})`);
        this.buckets.forEach((bucket, index) => {
            if (bucket.length > 0) {
                const entries = bucket.map(pair => `${pair[0]}: ${pair[1]}`).join(", ");
                console.log(`  [${index}]: ${entries}`);
            } else {
                console.log(`  [${index}]: empty`);
            }
        });
    }

    currentLoad(){
        return this.size / this.capacity;
    }

    resize() {
        this.capacity *= 2;
        const entries = this.entries();
        this.buckets = Array.from({ length: this.capacity }, () => []);
        this.size = 0;
        for (let entry of entries) {
            this.set(entry[0], entry[1]);
        }


    }
}