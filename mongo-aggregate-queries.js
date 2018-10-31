//Abdullah O Alharbi


Q1: 

db.employees.aggregate([
  { $group:
      {"_id":
        "$birth_date", 
        "count":{$sum:1} 
        }
  },
  
  { $sort: {"count":-1} },
  
  { $limit: 10  }
]);


Q2: 

db.employees.aggregate([
  {$match: {}}, 
  
  { $project: {
    _id: 0,
    emp_no: 1,
    first_name: 1,
    last_name: 1,
    salary: { $arrayElemAt: [ "$salaries", -1 ] }
    }
  },
  
  { $limit: 10}
]).pretty();


Q3: 

db.employees.aggregate([ 
    { $project: {
        _id: 0,
        salary: { 
            $map: { 
                input: "$salaries", 
                as: "sal",
                in:  "$$sal.salary"
            } 
        }
        
    }}, 
    { $unwind: "$salary" }, 
    { $group: { _id: "$_id", "averageSalary": { "$avg": "$salary" },
        count: {$sum: 1}
    }} 
]);


Q4: 

db.employees.aggregate([ 
    { $project: {
        _id: 0,
        salary: { 
            $map: { 
                input: "$salaries", 
                as: "sal",
                in:  "$$sal.salary"
            } 
        }
        
    }}, 
    { $unwind: "$salary" }, 
    { $group: { _id: "$_id", "averageSalary": { "$avg": "$salary" },
        count: {$sum: 1}
    }} 
]);

db.employees.aggregate([
    averageSalary = db.employees.aggregate([]).cursor.next("averageSalary"),
    {$project: {
        _id: 0,
        emp_no: 1,
        first_name: 1,
        last_name: 1,
        departments: 1,
        averageSalary: 1
        }},
        
        { $limit: 10}
]).pretty();


Q5: 

db.employees.aggregate([
    { $unwind: "$salaries"},
    { $match: { "salaries.to_date" : ISODate("9999-01-01T05:00:00Z") } },
    {$project: {
        _id: 0,
        emp_no: 1,
        first_name: 1,
        last_name: 1,
        departments: 1,
        salaries: 1
        }},
        
    { $limit: 20}
]).pretty();


Q6: 

db.employees.aggregate([
  { $project: {
        _id: 0,
        salary: { 
            $map: { 
                input: "$salaries", 
                as: "sal",
                in:  "$$sal.salary"
            } 
        }
        
    }}, 
  {$unwind: "$departments"},
  {$unwind: "$salaries" },
  { $group : { _id: "$departments.dept_name", "averageSalary": {$avg: "$salary"}
        }
    },
    
  { $sort: {"averageSalary":-1}}

]).pretty();