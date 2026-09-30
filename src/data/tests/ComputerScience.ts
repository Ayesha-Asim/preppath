import type { Question } from "./types";

export const Questions: Question[] = [
{
question: "Which data type in typical C/C++ implementations guarantees at least 64 bits and is standard in C99/C11/C++11 and later?",
options: ["long", "long long", "size_t", "int64_t"],
answer: 1,
explanation: "The type long long is guaranteed to be at least 64 bits by the C99/C11 standard and by C++11; long may be 32 bits on some platforms, size_t is implementation-dependent, and int64_t is provided via stdint.h if available but is not a built-in keyword."
},
{
question: "Which of the following sorting algorithms has the best worst-case time complexity?",
options: ["Quick Sort (standard in-place)", "Heap Sort", "Insertion Sort", "Bubble Sort"],
answer: 1,
explanation: "Heap Sort has a worst-case time complexity of O(n log n); Quick Sort can degrade to O(n^2) in the worst case without careful pivoting, while Insertion and Bubble Sort are O(n^2) in the worst case."
},
{
question: "Given an array of n distinct integers, which algorithmic approach guarantees finding the k-th smallest element in O(n) worst-case time?",
options: ["Sort the array and index k", "Quickselect with random pivot", "Median-of-medians selection", "Heap of size k"],
answer: 2,
explanation: "The median-of-medians selection algorithm deterministically chooses a good pivot and guarantees O(n) worst-case time to find the k-th smallest element; quickselect with random pivot has expected O(n) but not worst-case guarantee."
},
{
question: "Which of the following boolean expressions is equivalent to (A AND (NOT B)) OR ((NOT A) AND B)?",
options: ["A XOR B", "A XNOR B", "A OR B", "NOT(A XOR B)"],
answer: 0,
explanation: "The expression (A AND NOT B) OR (NOT A AND B) is true exactly when exactly one of A or B is true, which is the definition of exclusive OR (XOR)."
},
{
question: "In a singly linked list with only head pointer, which operation cannot be performed in O(1) time?",
options: ["Insert at head", "Delete head node", "Insert after a given node pointer", "Delete last node when only head is given"],
answer: 3,
explanation: "Deleting the last node requires finding the previous node when only the head pointer exists, which takes O(n) time; inserting at head, deleting head, or inserting after a known node pointer can be done in O(1)."
},
{
question: "Consider the recurrence T(n)=T(n-1)+O(1) with T(1)=O(1). What is the time complexity?",
options: ["O(log n)", "O(n)", "O(n log n)", "O(n^2)"],
answer: 1,
explanation: "Expanding T(n)=T(n-1)+O(1) yields a sum of O(1) repeated n times, giving O(n) time complexity."
},
{
question: "Which SQL statement removes all rows from a table but preserves the table structure and typically executes faster than DELETE without WHERE?",
options: ["DROP TABLE table_name", "DELETE FROM table_name", "TRUNCATE TABLE table_name", "REMOVE FROM table_name"],
answer: 2,
explanation: "TRUNCATE TABLE removes all rows and usually deallocates storage with less logging than DELETE, preserving the table structure; DROP TABLE removes the table itself."
},
{
question: "In C, what does the expression (ptr == NULL) test when ptr is a pointer variable?",
options: ["Whether ptr points to an object of value zero", "Whether ptr holds an invalid address", "Whether ptr does not point to any object (null pointer)", "Whether ptr points to the first element of an array"],
answer: 2,
explanation: "Comparing a pointer to NULL checks whether it is a null pointer (i.e., it does not point to any object or function). It does not indicate general validity of the address beyond being null."
},
{
question: "Which of the following time complexity classes grows fastest as n → ∞?",
options: ["O(n log n)", "O(2^n)", "O(n^2)", "O(n^1.5)"],
answer: 1,
explanation: "Exponential complexity O(2^n) grows faster than any polynomial or n log n as n becomes large, so it is the fastest-growing class among the options."
},
{
question: "Which layer of the TCP/IP model is responsible for routing packets between networks?",
options: ["Application layer", "Transport layer", "Internet (Network) layer", "Link layer"],
answer: 2,
explanation: "The Internet (Network) layer (e.g., IP) handles addressing and routing packets across different networks; the Transport layer provides end-to-end services above it."
},
{
question: "What is the primary difference between stack and heap memory in typical process memory models?",
options: ["Stack is for global variables; heap is for local variables", "Stack has dynamic lifetime; heap has automatic lifetime", "Stack stores local function frames with automatic lifetime; heap stores dynamic allocations with programmer-controlled lifetime", "Stack is unlimited; heap is size-limited"],
answer: 2,
explanation: "The stack stores local function frames with automatic (scope-bound) lifetime; the heap stores dynamically allocated memory whose lifetime is controlled by the program (malloc/free or new/delete)."
},
{
question: "Which of these search algorithms guarantees finding the shortest path in an unweighted graph?",
options: ["Depth-First Search (DFS)", "Breadth-First Search (BFS)", "Greedy Best-First Search", "Dijkstra without modifications"],
answer: 1,
explanation: "BFS explores a graph level-by-level and therefore finds the shortest path measured in number of edges in an unweighted graph; DFS and greedy approaches do not guarantee shortest paths."
},
{
question: "In object-oriented programming, which principle is demonstrated by providing multiple methods with the same name but different parameters?",
options: ["Encapsulation", "Inheritance", "Polymorphism (overloading)", "Abstraction"],
answer: 2,
explanation: "Method overloading (same method name, different parameter lists) is a form of compile-time polymorphism; encapsulation hides data, inheritance derives classes, and abstraction simplifies interfaces."
},
{
  question: "What is the output of the following C code?\n#include <stdio.h>\nint main() {\n    int sum = 0;\n    for (int i = 1; i <= 6; i++) {\n        if (i % 2 == 0)\n            sum += i;\n    }\n    printf(\"%d\", sum);\n    return 0;\n}",
  options: ["6", "12", "9", "21"],
  answer: 1,
  explanation: "Only the even values are added: 2 + 4 + 6 = 12."
},
{
question: "What is the result of applying the bitwise operation (x & (~x)) for any integer x?",
options: ["x", "~x", "0", "Undefined"],
answer: 2,
explanation: "x & (~x) is always 0 because for each bit position, ~x has the opposite bit of x, so no position can be 1 in both x and ~x simultaneously."
},
{
  question: "What is the output of the following C code?\n#include <stdio.h>\nint main() {\n    int a = 4, b = 7;\n    int *p = &a;\n    *p = b - a;\n    printf(\"%d %d\", a, b);\n    return 0;\n}",
  options: ["4 7", "3 3", "3 7", "7 3"],
  answer: 2,
  explanation: "p points to a. The expression b - a evaluates to 3, which is stored in a through *p. The value of b remains 7, so the output is 3 7."
},
{
question: "Which of the following is an advantage of using a hash table over a balanced binary search tree for average-case operations?",
options: ["Deterministic O(log n) worst-case lookup", "Average-case O(1) lookup time", "Ordered traversal is easy", "Uses less memory always"],
answer: 1,
explanation: "Hash tables provide average-case O(1) lookup/insert/delete under good hashing and load factor management, while balanced BSTs provide O(log n) guarantees; ordered traversal is easier with BSTs."
},
{
question: "In SQL, which clause is used to remove duplicate rows from the result set of a SELECT query?",
options: ["WHERE", "DISTINCT", "GROUP BY", "HAVING"],
answer: 1,
explanation: "The DISTINCT keyword after SELECT removes duplicate rows from the result set; WHERE filters rows before projection, GROUP BY groups rows, HAVING filters groups."
},
{
question: "Which of the following is NOT a property of a transaction in databases (ACID)?",
options: ["Atomicity", "Consistency", "Isolation", "Distribution"],
answer: 3,
explanation: "ACID properties are Atomicity, Consistency, Isolation, Durability; Distribution is not one of the ACID properties."
},
{
question: "What is the binary representation of decimal 13 in 8-bit unsigned form?",
options: ["00001101", "00001011", "00011101", "00000101"],
answer: 0,
explanation: "Decimal 13 equals binary 1101; in 8-bit zero-padded form that is 00001101 (8+4+1)."
},
{
question: "Which protocol provides reliable, ordered, byte-stream delivery between processes over an IP network?",
options: ["UDP", "ICMP", "TCP", "IP"],
answer: 2,
explanation: "TCP is a connection-oriented transport protocol that provides reliable, ordered, byte-stream delivery; UDP is connectionless and does not guarantee reliability or order."
},
{
question: "Which complexity class describes algorithms that use logarithmic extra space beyond the input?",
options: ["O(1) space", "O(log n) space", "O(n) space", "O(n log n) space"],
answer: 1,
explanation: "O(log n) space means the algorithm uses additional memory proportional to the logarithm of input size (e.g., recursion depth for balanced divide-and-conquer), distinct from constant or linear additional space."
},
{
question: "In pointer arithmetic in C, given int *p and p points to element i of an int array, what does p+3 mean?",
options: ["Add 3 bytes to p address", "Add 3 to the integer value pointed by p", "Advance pointer by 3 elements (3 * sizeof(int) bytes)", "Move pointer to array index 3 regardless of i"],
answer: 2,
explanation: "Pointer arithmetic scales by the size of the pointed type: p+3 moves the pointer forward by three elements, i.e., by 3 * sizeof(int) bytes, to point to element i+3."
},
{
question: "Which sorting algorithm is stable and has O(n^2) worst-case time but performs very well on nearly-sorted inputs?",
options: ["Selection Sort", "Insertion Sort", "Heap Sort", "Merge Sort"],
answer: 1,
explanation: "Insertion Sort is stable, has O(n^2) worst-case time, but runs in nearly O(n) time for nearly-sorted inputs, making it efficient for such cases."
},
{
question: "Which of the following is a correct definition of a NULL-terminated string in C?",
options: ["Array of chars with size known at compile time only", "Sequence of characters ending with '\0' character", "Pointer to characters where length is stored in first byte", "String object type provided by the language"],
answer: 1,
explanation: "In C a string is represented as a sequence of characters terminated by the null character '\0'; there is no built-in string object that stores length automatically."
},
{
question: "Which time complexity best describes checking if a number n is prime by trial division up to sqrt(n)?",
options: ["O(n)", "O(sqrt(n))", "O(log n)", "O(n log n)"],
answer: 1,
explanation: "Trial division up to sqrt(n) tests about sqrt(n) candidate divisors, giving O(sqrt(n)) time complexity."
},
{
question: "Which of the following describes the function of a compiler's symbol table?",
options: ["Store machine code instructions", "Map identifiers to attributes like type, scope, and memory location", "Execute the program at runtime", "Optimize CPU pipeline usage"],
answer: 1,
explanation: "A compiler's symbol table maps identifiers (variables, functions, types) to attributes such as type, scope, and memory location, and is used during semantic analysis and code generation."
},
{
question: "In digital circuits, what does a half-adder produce for two input bits A and B?",
options: ["Sum and carry bits", "Only sum bit", "Only carry bit", "Sum, carry, and overflow indicator"],
answer: 0,
explanation: "A half-adder outputs a sum bit (A XOR B) and a carry bit (A AND B) for two single-bit inputs; overflow is a multi-bit addition concern."
},
{
question: "Which of the following best describes virtual memory?",
options: ["A hardware device that increases RAM", "A disk-based backup of files", "An OS mechanism using disk to extend apparent RAM via paging", "A technique to compress memory contents automatically"],
answer: 2,
explanation: "Virtual memory is an OS mechanism that uses disk (swap/page file) along with hardware support to give processes the illusion of a larger contiguous address space by paging sections between RAM and disk."
},
{
  question: "What is the output of this Python code?\ndef f(a, L=[]):\n L.append(a)\n return L\nprint(f(1))\nprint(f(2))",
  options: [
    "[1] then [2]",
    "[1] then [1, 2]",
    "[1, 2] then [1, 2]",
    "Syntax error"
  ],
  answer: 1,
  explanation: "Default mutable arguments are evaluated only once when the function is defined. The same list L is reused in both calls, so print(f(1)) gives [1], and print(f(2)) gives [1, 2]."
},
{
question: "Which search algorithm is optimal for pathfinding on a weighted graph when using an admissible heuristic?",
options: ["Depth-First Search", "A* search", "Greedy Best-First Search", "Breadth-First Search"],
answer: 1,
explanation: "A* search with an admissible heuristic (one that never overestimates true cost) is optimal and finds the least-cost path; Greedy Best-First is not guaranteed optimal."
},
{
question: "In relational algebra, which operation corresponds to SQL SELECT ... WHERE (without projection)?",
options: ["Projection", "Selection (sigma)", "Join", "Union"],
answer: 1,
explanation: "The selection operation (sigma) filters rows according to a predicate and corresponds to SQL's WHERE clause; projection corresponds to choosing specific columns."
},
{
question: "Which of the following is a common cause of buffer overflow vulnerabilities in C programs?",
options: ["Using dynamic memory allocation", "Using strcpy without checking source length", "Using const qualifiers", "Compiling with optimizations"],
answer: 1,
explanation: "Using unsafe functions like strcpy without bounds checking can overflow the destination buffer when the source is larger, causing buffer overflow vulnerabilities; dynamic allocation or const qualifiers are not inherently the cause."
},
{
question: "For an array-based queue using circular buffer with capacity N, which condition indicates the queue is full when using a size counter?",
options: ["front == rear", "(rear + 1) % N == front", "size == N", "front == (rear + 1) % N"],
answer: 2,
explanation: "When a separate size counter is maintained, the queue is full when size == N; the (rear + 1) % N == front condition is used when no size counter is present and one slot must be left empty to distinguish full from empty."
},
{
question: "Which of the following number system conversions is correct: binary 1110 to hexadecimal?",
options: ["E", "D", "F", "A"],
answer: 0,
explanation: "Binary 1110 corresponds to decimal 14, which is hexadecimal 'E'."
},
{
question: "In C++ which feature allows a derived class to replace a base class method so calls through base pointers invoke derived behavior at runtime?",
options: ["Function overloading", "Virtual functions (polymorphism)", "Templates", "Namespaces"],
answer: 1,
explanation: "Declaring a method virtual in the base class enables runtime polymorphism so that calls through base-class pointers dispatch to the overridden derived-class implementation."
},
{
question: "Which of the following describes the worst-case number of comparisons for binary search on a sorted array of n elements?",
options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
answer: 1,
explanation: "Binary search halves the search interval each comparison, resulting in O(log n) worst-case comparisons for n elements."
},
{
question: "Which data structure is best suited for implementing undo functionality where operations must be undone in reverse order?",
options: ["Queue", "Stack", "Linked list", "Binary heap"],
answer: 1,
explanation: "Undo operations are Last-In-First-Out, so a stack is the appropriate data structure to push operations and pop them to undo in reverse order."
},
{
question: "Which RAID level provides striping with parity and can tolerate one disk failure while providing improved read performance?",
options: ["RAID 0", "RAID 1", "RAID 5", "RAID 6"],
answer: 2,
explanation: "RAID 5 uses block-level striping with distributed parity, tolerates one disk failure, and improves read performance; RAID 6 tolerates two failures, RAID 1 is mirroring, and RAID 0 has no redundancy."
},
{
  question: "Which architectural component directs instruction fetch, decode, and execution using signals such as the program counter and instruction register?",
  options: ["ALU", "Control Unit", "Cache", "Register file"],
  answer: 1,
  explanation: "The Control Unit coordinates the fetch-decode-execute cycle and controls the flow of instructions. The program counter and instruction register are registers used in this process, while the ALU performs arithmetic and logic operations."
},
{
question: "Which of the following is a stable sorting algorithm with O(n log n) worst-case time and requires O(n) extra space?",
options: ["Quicksort (in-place)", "Mergesort", "Heapsort", "Selection Sort"],
answer: 1,
explanation: "Mergesort is stable, has O(n log n) worst-case time, and requires O(n) auxiliary space for merging; in-place quicksort is typically unstable and can have O(n^2) worst-case."
},
{
question: "Which of the following best describes a TCP three-way handshake sequence?",
options: ["SYN, ACK, FIN", "SYN, SYN-ACK, ACK", "ACK, SYN, SYN-ACK", "SYN-ACK, ACK, FIN"],
answer: 1,
explanation: "The TCP three-way handshake is: client sends SYN, server responds with SYN-ACK, client replies with ACK to establish the connection."
},
{
question: "Which of these is a characteristic of static typing in programming languages?",
options: ["Type errors detected only at runtime", "Variables have no declared type", "Type checking performed at compile time", "Programs run slower due to typing"],
answer: 2,
explanation: "Static typing performs type checking at compile time so many type errors are caught before execution; dynamic typing defers checks to runtime."
},
{
question: "What is the primary benefit of using indexes in relational databases?",
options: ["Eliminate need for transactions", "Speed up query lookups at the cost of extra storage and slower writes", "Automatically normalize data", "Guarantee ACID properties"],
answer: 1,
explanation: "Indexes speed up query lookups (especially for WHERE and JOIN) but consume extra storage and add overhead for write operations due to maintenance."
},
{
  question: "What is the output of the following C code?\n#include <stdio.h>\nint main() {\n    int x = 0;\n    for (int i = 1; i <= 4; i++)\n        x += i * 2;\n    printf(\"%d\", x);\n    return 0;\n}",
  options: ["20", "10", "16", "24"],
  answer: 0,
  explanation: "The loop adds 2, 4, 6, and 8. Therefore, x becomes 20."
},
{
question: "Which of the following best describes a pointer-to-pointer in C (e.g., int **pp)?",
options: ["Pointer to an array only", "Pointer that stores address of another pointer which in turn points to an int", "Pointer that cannot be dereferenced", "Pointer that stores a double value"],
answer: 1,
explanation: "int **pp is a pointer to a pointer to int: it stores the address of an int*; dereferencing once yields an int*, and dereferencing twice yields an int."
},
{
question: "If a function uses O(n) extra space and runs in O(n log n) time, what are its space and time complexities?",
options: ["Time O(n), Space O(n log n)", "Time O(n log n), Space O(n)", "Time O(n), Space O(1)", "Time O(n log n), Space O(1)"],
answer: 1,
explanation: "By statement: the algorithm runs in O(n log n) time and uses O(n) extra space, so time is O(n log n) and space is O(n)."
},
{
question: "Which of the following is true about DHCP in networking?",
options: ["DHCP provides static IP assignments only", "DHCP dynamically assigns IP addresses and configuration parameters to hosts", "DHCP encrypts all traffic between client and server", "DHCP operates at the application layer and requires manual configuration on each packet"],
answer: 1,
explanation: "DHCP dynamically assigns IP addresses and related configuration (gateway, DNS) to hosts on a network; it does not inherently encrypt traffic."
},
{
question: "Which data structure provides FIFO behavior and can be implemented using two stacks with amortized O(1) operations?",
options: ["Priority queue", "Queue implemented with two stacks", "Deque", "Binary heap"],
answer: 1,
explanation: "A queue can be implemented using two stacks (one for enqueue, one for dequeue) to achieve amortized O(1) enqueue and dequeue operations."
},
{
question: "Which of the following is a secure practice to mitigate SQL injection attacks?",
options: ["Concatenate user input into SQL strings", "Use prepared statements with parameterized queries", "Disable authentication", "Store passwords in plain text"],
answer: 1,
explanation: "Using prepared statements (parameterized queries) ensures user input is treated as data rather than executable SQL, preventing SQL injection; concatenating inputs is unsafe."
},
{
question: "Which of these statements about recursion and tail recursion is correct?",
options: ["All recursive functions are tail recursive", "Tail recursion can be optimized into iteration by compilers when supported", "Tail recursion always uses more stack than non-tail recursion", "Languages cannot optimize tail calls"],
answer: 1,
explanation: "When a recursive call is the last action (tail recursion), some compilers or runtimes can apply tail-call optimization to convert recursion into iteration, reducing stack usage; not all recursive functions are tail recursive."
},
{
question: "Which of the following best describes a virtual function table (vtable) in C++?",
options: ["A table that stores all global variables", "A runtime mechanism used to support dynamic dispatch of virtual functions", "A compiler optimization for inlining functions", "A data structure for exception handling only"],
answer: 1,
explanation: "A vtable is a runtime mechanism (a table of function pointers) used by many C++ implementations to support dynamic dispatch of virtual functions so overridden methods are called via base-class pointers."
},
{
question: "Which algorithmic technique divides a problem into smaller subproblems, solves them recursively, and combines their solutions?",
options: ["Greedy", "Divide and Conquer", "Dynamic Programming", "Backtracking"],
answer: 1,
explanation: "Divide and conquer splits the problem into independent subproblems solved recursively and then combines their solutions (examples: mergesort, quicksort); dynamic programming is used when subproblems overlap."
},
{
question: "Which layer in the OSI model is responsible for end-to-end communication and error recovery?",
options: ["Physical", "Data Link", "Transport", "Session"],
answer: 2,
explanation: "The Transport layer (OSI layer 4) provides end-to-end communication services including error detection/recovery and flow control (e.g., TCP)."
},
{
question: "Which of the following is the correct description of a memory leak?",
options: ["An allocation that is freed twice", "Failure to free dynamically allocated memory leading to unreachable allocated blocks", "Accessing memory out of bounds", "Using uninitialized memory"],
answer: 1,
explanation: "A memory leak occurs when dynamically allocated memory is not freed and becomes unreachable, causing resource leakage; double-free and out-of-bounds access are different categories of memory errors."
},
{
question: "Which of these SQL clauses is used to filter results after aggregation (i.e., after GROUP BY)?",
options: ["WHERE", "HAVING", "ORDER BY", "LIMIT"],
answer: 1,
explanation: "HAVING filters groups after aggregation (GROUP BY), for example HAVING COUNT(*) > 1, whereas WHERE filters rows before grouping."
},
{
question: "What is the result of logical expression (true && false) || (!false) in typical C-like languages?",
options: ["true", "false", "Compiler error", "Depends on language"],
answer: 0,
explanation: "(true && false) is false; !false is true; false || true evaluates to true, so the overall expression is true."
},
{
  "question": "What is the output of this C code?\n#include <stdio.h>\nint main()\n{\nint var = 012;\nprintf(\"%d\", var);\n}",
  "options": ["2", "10", "12", "14"],
  "answer": 1,
  "explanation": "In C, an integer beginning with 0 is interpreted as octal. Octal 012 is equal to decimal 10, so the output is 10."
},
{
  "question": "Which of the following does NOT belong to the application layer of the TCP/IP model?",
  "options": ["HTTP", "TCP", "SMTP", "FTP"],
  "answer": 1,
  "explanation": "HTTP, SMTP, and FTP are application-layer protocols. TCP belongs to the transport layer."
},
{
  "question": "What is the output of this C code?\n#include <stdio.h>\nint main()\n{\nint i = -5;\nint k = i % 2;\nprintf(\"%d\", k);\n}",
  "options": ["-1", "1", "0", "Compile time error"],
  "answer": 0,
  "explanation": "In C, the remainder has the same sign as the dividend. Therefore, -5 % 2 gives -1."
},
{
  "question": "What will be the output of the following C code?\n#include <stdio.h>\nint main()\n{\nint n = 1;\ndo\n{\nprintf(\"%d \", n);\nn = n * 4;\n}\nwhile (n <= 256);\n}",
  "options": ["1 4 16", "4 16 64 256", "1 4 16 64 256", "1 4 16 64"],
  "answer": 2,
  "explanation": "The do-while loop prints 1, 4, 16, 64, and 256 before n becomes 1024 and the condition becomes false."
},
{
  "question": "How many bytes does the double data type commonly occupy in memory?",
  "options": ["2", "4", "8", "16"],
  "answer": 2,
  "explanation": "A double commonly occupies 8 bytes of memory and provides greater precision than a float."
},
{
  "question": "What is the output of this C code?\n#include <stdio.h>\nint main()\n{\nint n = 0, m = 0;\nif (n > 0)\nif (m > 0)\nprintf(\"True\");\nelse\nprintf(\"False\");\n}",
  "options": ["True", "False", "No output will be printed", "Runtime error"],
  "answer": 2,
  "explanation": "The outer condition n > 0 is false, so the nested if statement and its else are never executed. Therefore, nothing is printed."
},
{
  "question": "If the type of the first operand is int and the type of the second operand is double, the expression will generally be evaluated as which type?",
  "options": ["int", "long", "double", "float"],
  "answer": 2,
  "explanation": "In arithmetic expressions, the int value is converted to double when combined with a double. Therefore, the result is evaluated as double."
},
{
  "question": "Organizing a database according to how data will actually be stored on computer disk is done during:",
  "options": ["Logical design", "Physical design", "Analysis", "Implementation"],
  "answer": 1,
  "explanation": "Physical database design deals with how data is stored on physical storage devices such as disks."
},
{
  question: "A computer uses 16-bit addresses, with each address referring to one byte of memory. What is the maximum directly addressable memory?",
  options: ["32 KB", "64 KB", "128 KB", "256 KB"],
  answer: 1,
  explanation: "A 16-bit address can represent 2^16 = 65,536 addresses. At one byte per address, this equals 65,536 bytes or 64 KB."
},
{
  "question": "What is the output of the following C program?\n#include <stdio.h>\nint main()\n{\nint i;\nfor (i = 0; i < 10; i++);\nprintf(\"%d\", i);\n}",
  "options": ["10", "11", "0123456789", "Syntax error"],
  "answer": 0,
  "explanation": "The semicolon after the for loop makes it an empty loop. After the loop finishes, i has the value 10, which is printed."
},
{
  "question": "What is the output of the following C program?\n#include <stdio.h>\nint main()\n{\nint a = -5;\nint k = (a++, ++a);\nprintf(\"%d\", k);\n}",
  "options": ["-3", "-4", "-5", "4"],
  "answer": 0,
  "explanation": "The comma operator evaluates both expressions from left to right. a++ changes -5 to -4, then ++a changes it to -3, so k becomes -3."
},
{
  "question": "What is the output of the following C program?\n#include <stdio.h>\nint main()\n{\nint i = 0;\nif (i == 0)\n{\ngoto label;\n}\nlabel: printf(\"HELLO\");\n}",
  "options": ["Nothing", "Error", "Infinite HELLO", "HELLO"],
  "answer": 3,
  "explanation": "Since i is 0, the goto statement transfers control to label, where HELLO is printed once."
},
{
  question: "Which statement correctly describes RAM and ROM?",
  options: ["Both RAM and ROM lose their contents when power is removed", "RAM is non-volatile while ROM is volatile", "RAM is generally volatile, while ROM retains stored information without normal operating power", "ROM is used as the CPU's primary working memory"],
  answer: 2,
  explanation: "RAM is generally volatile and is used as working memory. ROM is non-volatile and retains stored information without normal operating power."
},
{
  question: "If a processor has a 32-bit data bus, how many bits can it transfer over that bus in one transfer?",
  options: ["32 bits", "8 bits", "16 bits", "64 bits"],
  answer: 0,
  explanation: "The width of a data bus indicates how many bits can be transferred in parallel in one bus transfer. Therefore, a 32-bit data bus transfers 32 bits at a time."
},
{
  question: "Which memory hierarchy is correctly ordered from generally fastest to slowest?",
  options: ["Cache → Registers → RAM → SSD", "RAM → Cache → Registers → SSD", "Registers → RAM → Cache → SSD", "Registers → Cache → RAM → SSD"],
  answer: 3,
  explanation: "CPU registers are generally fastest, followed by cache, main memory (RAM), and then secondary storage such as an SSD."
},

{
  question: "What is the output of the following C code?\n#include <stdio.h>\nint main() {\n    int x = 5;\n    printf(\"%d\", x << 2);\n    return 0;\n}",
  options: ["10", "20", "25", "40"],
  answer: 1,
  explanation: "Left-shifting 5 by 2 positions multiplies it by 2^2 when the value is representable. Thus, 5 << 2 = 5 × 4 = 20."
},

{
  question: "Which traversal of a Binary Search Tree produces the stored keys in ascending order?",
  options: ["Preorder", "Inorder", "Postorder", "Level-order"],
  answer: 1,
  explanation: "For a Binary Search Tree, inorder traversal visits the left subtree, root, and right subtree. Because smaller keys are on the left and larger keys are on the right, the result is ascending order."
},

{
  question: "A complete binary tree has 31 nodes. How many levels does it have if the root is considered level 1?",
  options: ["4", "5", "6", "31"],
  answer: 1,
  explanation: "A perfect binary tree with L levels contains 2^L - 1 nodes. Since 31 = 2^5 - 1, the tree has 5 levels."
},

{
  question: "What is the decimal value of the binary number 101101?",
  options: ["41", "43", "45", "47"],
  answer: 2,
  explanation: "101101₂ = 32 + 8 + 4 + 1 = 45."
},

{
  question: "Which hexadecimal value is equivalent to binary 11010110?",
  options: ["C6", "D6", "D4", "E6"],
  answer: 1,
  explanation: "Group the binary number into 4-bit groups: 1101 0110. 1101 is D and 0110 is 6, giving D6."
},

{
  question: "What is the result of the binary addition 1011 + 0110?",
  options: ["10001", "11001", "11101", "10101"],
  answer: 0,
  explanation: "1011₂ is 11 and 0110₂ is 6. Their sum is 17, which is 10001₂."
},

{
  question: "What is the 8-bit two's complement representation of -5?",
  options: ["11111010", "11111011", "10000101", "11110101"],
  answer: 1,
  explanation: "5 is 00000101. Inverting the bits gives 11111010 and adding 1 gives 11111011, the 8-bit two's complement representation of -5."
},

{
  question: "Which Boolean expression represents De Morgan's law for NOT(A AND B)?",
  options: ["(NOT A) AND (NOT B)", "(NOT A) OR (NOT B)", "A OR B", "(NOT A) XOR (NOT B)"],
  answer: 1,
  explanation: "De Morgan's law states that NOT(A AND B) = (NOT A) OR (NOT B)."
},

{
  question: "Which gate produces an output of 0 only when all of its inputs are 1?",
  options: ["NOR", "XOR", "NAND", "OR"],
  answer: 2,
  explanation: "A NAND gate is the complement of AND. Therefore, it outputs 0 only when every input is 1."
},

{
  question: "For a two-input XOR gate, what is the output when A = 1 and B = 1?",
  options: ["0", "1", "Undefined", "Depends on previous output"],
  answer: 0,
  explanation: "XOR outputs 1 when its inputs differ. Since both inputs are 1, the output is 0."
},

{
  question: "Which component of a CPU performs arithmetic operations and logical comparisons?",
  options: ["Control Unit", "ALU", "Program Counter", "Memory Address Register"],
  answer: 1,
  explanation: "The Arithmetic Logic Unit (ALU) performs arithmetic operations such as addition and logical operations such as AND and comparisons."
},

{
  question: "Which CPU register normally contains the address of the next instruction to be executed?",
  options: ["Instruction Register", "Accumulator", "Program Counter", "Memory Data Register"],
  answer: 2,
  explanation: "The Program Counter stores the memory address of the next instruction to be fetched."
},

{
  question: "Which type of memory is generally the fastest?",
  options: ["RAM", "SSD", "CPU registers", "Cache memory"],
  answer: 2,
  explanation: "CPU registers are located directly inside the processor and are generally faster to access than cache, RAM, or secondary storage."
},

{
  question: "Which cache mapping technique allows a memory block to be placed in any cache line?",
  options: ["Direct mapping", "Fully associative mapping", "Set-associative mapping only", "Sequential mapping"],
  answer: 1,
  explanation: "In fully associative mapping, any main-memory block may be placed in any available cache line."
},

{
  question: "What is the primary purpose of cache memory?",
  options: ["Provide permanent file storage", "Reduce average CPU memory-access time", "Replace CPU registers", "Increase hard-disk capacity"],
  answer: 1,
  explanation: "Cache stores frequently or recently used instructions and data close to the CPU, reducing average memory-access time."
},

{
  question: "Which scheduling algorithm may cause starvation of long CPU-burst processes when short jobs continually arrive?",
  options: ["FCFS", "Shortest Job First", "Round Robin", "FIFO page replacement"],
  answer: 1,
  explanation: "Shortest Job First favors processes with smaller CPU bursts. Long jobs can experience starvation if shorter jobs continue arriving."
},

{
  question: "In Round Robin CPU scheduling, what determines how long a process may execute before being preempted?",
  options: ["Page size", "Time quantum", "Process ID", "Cache size"],
  answer: 1,
  explanation: "Round Robin assigns each ready process a fixed time quantum. If the process does not finish within that interval, it is preempted."
},

{
  question: "Which of the following is one of the necessary conditions for deadlock?",
  options: ["Preemption of every resource", "Circular wait", "Unlimited resources", "All processes having equal priority"],
  answer: 1,
  explanation: "Circular wait is one of the four Coffman conditions for deadlock, along with mutual exclusion, hold-and-wait, and no preemption."
},

{
  question: "What occurs when a process accesses a virtual-memory page that is not currently present in physical memory?",
  options: ["Cache hit", "Page fault", "Deadlock", "Stack overflow"],
  answer: 1,
  explanation: "A page fault occurs when the requested virtual-memory page is not currently resident in RAM, requiring the operating system to handle the missing page."
},

{
  question: "Which page-replacement algorithm can exhibit Belady's anomaly?",
  options: ["Optimal", "LRU", "FIFO", "All page-replacement algorithms"],
  answer: 2,
  explanation: "FIFO can exhibit Belady's anomaly, where increasing the number of available page frames unexpectedly increases the number of page faults."
},

{
  question: "Which condition best describes thrashing in a virtual-memory system?",
  options: ["CPU spends most of its time executing instructions", "System spends excessive time handling page faults", "Hard disk becomes permanently corrupted", "Multiple CPUs execute the same process"],
  answer: 1,
  explanation: "Thrashing occurs when processes do not have enough frames and the system spends excessive time swapping pages rather than performing useful computation."
},

{
  question: "Binary search is applied to a sorted array containing 16 elements. After the first comparison eliminates one half of the array, at most how many elements remain in the relevant half?",
  options: ["15", "8", "4", "1"],
  answer: 1,
  explanation: "Binary search eliminates approximately half of the current search space. Starting with 16 elements leaves at most 8 elements in the relevant half."
},

{
  question: "Which SQL JOIN returns only rows having matching values in both joined tables?",
  options: ["LEFT JOIN", "FULL OUTER JOIN", "INNER JOIN", "CROSS JOIN"],
  answer: 2,
  explanation: "INNER JOIN returns rows for which the specified join condition matches records from both tables."
},

{
  question: "A foreign key in a relational database primarily helps enforce:",
  options: ["Referential integrity", "Data compression", "Encryption", "Sorting order"],
  answer: 0,
  explanation: "A foreign key establishes a relationship with a candidate key, usually a primary key, in another or the same table and helps enforce referential integrity."
},

{
  question: "Which normal form requires every non-key attribute to depend on the whole candidate key, eliminating partial dependency?",
  options: ["1NF", "2NF", "3NF", "BCNF"],
  answer: 1,
  explanation: "Second Normal Form requires 1NF and eliminates partial dependencies of non-prime attributes on part of a candidate key."
},

{
  question: "A relation is in First Normal Form (1NF) when:",
  options: ["Every table has exactly one foreign key", "Every attribute contains atomic values", "All transitive dependencies are removed", "Every determinant is a candidate key"],
  answer: 1,
  explanation: "1NF requires attributes to contain atomic, single-valued entries rather than repeating groups or multiple values in one field."
},

{
  question: "Which SQL aggregate function returns the number of rows represented by an expression such as COUNT(*)?",
  options: ["SUM", "TOTAL", "COUNT", "NUMBER"],
  answer: 2,
  explanation: "COUNT(*) returns the number of rows in the result or group, including rows containing NULL values in individual columns."
},

{
  question: "Which condition is essential before ordinary binary search can be correctly applied to an array?",
  options: ["The array must contain only integers", "The array must contain an even number of elements", "The array must be sorted according to the search ordering", "Every element must be unique"],
  answer: 2,
  explanation: "Binary search relies on ordering to determine which half of the array can be discarded. Therefore, the array must be sorted according to the search ordering."
},

{
  question: "What is the worst-case time complexity of searching for an element in an unsorted array using linear search?",
  options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
  answer: 2,
  explanation: "In the worst case, linear search examines all n elements, giving O(n) time complexity."
},

{
  question: "What is the time complexity of accessing an array element by its valid index in the standard random-access model?",
  options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
  answer: 0,
  explanation: "The address of an indexed array element can be calculated directly from the base address and index, so indexed access takes O(1) time."
},

{
  question: "What is the worst-case time complexity of inserting an element at the beginning of a standard contiguous array containing n elements when sufficient capacity exists?",
  options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
  answer: 2,
  explanation: "Existing elements generally have to be shifted one position to make room at the beginning, requiring O(n) operations."
},

{
  question: "In a max-heap, which property must hold for every node other than the root?",
  options: ["Its value is greater than its parent's value", "Its value is less than or equal to its parent's value", "Its left child must equal its right child", "All nodes must be stored in sorted order"],
  answer: 1,
  explanation: "In a max-heap, each parent has a value greater than or equal to its children. Therefore, every non-root node is less than or equal to its parent."
},
{
  question: "What is the output of the following C code?\n#include <stdio.h>\nint main() {\n    int x = 7;\n    printf(\"%d\", x / 2 * 2);\n    return 0;\n}",
  options: ["6", "7", "7.0", "8"],
  answer: 0,
  explanation: "Both operands of x / 2 are integers, so integer division gives 7 / 2 = 3. Then 3 * 2 = 6."
},

{
  question: "What is the output of the following C code?\n#include <stdio.h>\nint main() {\n    int a = 3, b = 4;\n    printf(\"%d\", a > 2 && b < 4);\n    return 0;\n}",
  options: ["0", "1", "3", "4"],
  answer: 0,
  explanation: "a > 2 is true, but b < 4 is false because b equals 4. true && false evaluates to false, represented by 0."
},

{
  question: "What is the output of the following C code?\n#include <stdio.h>\nint main() {\n    int x = 2;\n    switch (x) {\n        case 1: printf(\"A\");\n        case 2: printf(\"B\");\n        case 3: printf(\"C\");\n        default: printf(\"D\");\n    }\n    return 0;\n}",
  options: ["B", "BC", "BCD", "ABCD"],
  answer: 2,
  explanation: "Execution begins at case 2. Because there are no break statements, control falls through case 3 and default, producing BCD."
},

{
  question: "What is the output of the following C code?\n#include <stdio.h>\nint main() {\n    int sum = 0;\n    for (int i = 1; i <= 6; i++) {\n        if (i % 2 == 0)\n            sum += i;\n    }\n    printf(\"%d\", sum);\n    return 0;\n}",
  options: ["6", "12", "9", "21"],
  answer: 1,
  explanation: "Only the even values are added to sum: 2 + 4 + 6 = 12."
},

{
  question: "What is the output of the following C code?\n#include <stdio.h>\nint main() {\n    int a[] = {2, 4, 6, 8};\n    printf(\"%d\", *(a + 2));\n    return 0;\n}",
  options: ["2", "4", "6", "8"],
  answer: 2,
  explanation: "The array name a points to its first element. a + 2 points to the third element, and dereferencing it gives 6."
},

{
  question: "What is the output of the following C code?\n#include <stdio.h>\nint main() {\n    int x = 10;\n    int *p = &x;\n    *p += 5;\n    printf(\"%d\", x);\n    return 0;\n}",
  options: ["5", "10", "15", "Address of x"],
  answer: 2,
  explanation: "p points to x. Therefore, *p += 5 modifies x directly from 10 to 15."
},

{
  question: "Which statement about a compiler and an interpreter is generally correct?",
  options: ["A compiler translates source code before execution, while an interpreter typically processes and executes code through an interpreter runtime", "An interpreter always produces a standalone executable before running the program", "A compiler can process only assembly language", "An interpreter is a hardware component"],
  answer: 0,
  explanation: "A compiler generally translates source code before execution, whereas an interpreter typically processes program instructions through an interpreter runtime during execution."
},

{
  question: "Which phase of the software development life cycle primarily determines and documents what a proposed system must do?",
  options: ["Maintenance", "Testing", "Deployment", "Requirements analysis"],
  answer: 3,
  explanation: "Requirements analysis identifies and documents the functional and non-functional requirements that the proposed system must satisfy."
},

{
  question: "What is the output of the following Python code?\nx = [1, 2, 3]\ny = x\ny.append(4)\nprint(x)",
  options: ["[1, 2, 3]", "[1, 2, 3, 4]", "[4, 1, 2, 3]", "Error"],
  answer: 1,
  explanation: "y = x makes y reference the same list object as x. Appending through y therefore also changes the list observed through x."
},

{
  question: "What is the output of the following Python code?\nprint(2 ** 3 ** 2)",
  options: ["64", "512", "36", "256"],
  answer: 1,
  explanation: "Python exponentiation is right-associative. Therefore, 2 ** 3 ** 2 is evaluated as 2 ** (3 ** 2) = 2 ** 9 = 512."
},

{
  question: "What is the output of the following Python expression?\nprint(17 // 5, 17 % 5)",
  options: ["3 2", "3.4 2", "2 3", "3 5"],
  answer: 0,
  explanation: "// performs floor division and % returns the remainder. Therefore, 17 // 5 = 3 and 17 % 5 = 2."
},

{
  question: "Which Python data type is immutable?",
  options: ["list", "set", "dictionary", "tuple"],
  answer: 3,
  explanation: "A tuple is immutable after creation, whereas lists, sets, and dictionaries are mutable."
},

{
  question: "What is the output of the following Python code?\na = [10, 20, 30, 40, 50]\nprint(a[1:4])",
  options: ["[10, 20, 30, 40]", "[20, 30, 40]", "[20, 30, 40, 50]", "[10, 20, 30]"],
  answer: 1,
  explanation: "Python slicing includes the start index but excludes the stop index. Indices 1, 2, and 3 contain 20, 30, and 40."
},

{
  question: "What is the result of adding the unsigned 4-bit binary numbers 1011 and 0101?",
  options: ["0000 with no carry", "0001 with carry 0", "1111 with carry 0", "0000 with carry 1"],
  answer: 3,
  explanation: "1011₂ is 11 and 0101₂ is 5. Their sum is 16, represented as 10000₂. In a 4-bit result, the lower four bits are 0000 with a carry-out of 1."
},

{
  question: "What is the worst-case time complexity of inserting a new key into a balanced binary search tree?",
  options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
  answer: 1,
  explanation: "A balanced binary search tree maintains height O(log n). Finding the insertion position and restoring balance therefore take O(log n) time."
},

{
  question: "Which data structure is normally used by Breadth-First Search to store vertices waiting to be explored?",
  options: ["Stack", "Queue", "Heap", "Hash table only"],
  answer: 1,
  explanation: "BFS explores vertices level by level and uses a FIFO queue to process vertices in discovery order."
},

{
  question: "Which data structure is naturally used by an iterative Depth-First Search?",
  options: ["Queue", "Stack", "Priority queue", "Circular buffer only"],
  answer: 1,
  explanation: "Depth-First Search follows one path deeply before backtracking. An explicit stack provides this LIFO behavior in iterative DFS."
},

{
  question: "What is the output of the following C code?\n#include <stdio.h>\nint main() {\n    int a = 5;\n    if (a > 2 && a < 5)\n        printf(\"A\");\n    else if (a == 5)\n        printf(\"B\");\n    else\n        printf(\"C\");\n    return 0;\n}",
  options: ["A", "C", "No output", "B"],
  answer: 3,
  explanation: "The first condition is false because a < 5 is false. The condition a == 5 is true, so B is printed."
},

{
  question: "A binary tree contains 20 nodes. How many edges does it contain?",
  options: ["19", "20", "21", "40"],
  answer: 0,
  explanation: "Every tree with n vertices has exactly n - 1 edges. Therefore, a tree with 20 nodes has 19 edges."
},

{
  question: "In a full binary tree, every node has:",
  options: ["Exactly two children", "Either zero or two children", "At most one child", "The same value as its children"],
  answer: 1,
  explanation: "A full binary tree is defined as a binary tree in which each node has either zero children or exactly two children."
},

{
  question: "Which graph representation is generally more space-efficient for a sparse graph with V vertices and E edges?",
  options: ["Adjacency matrix", "Adjacency list", "V × V Boolean table", "Complete incidence matrix in all cases"],
  answer: 1,
  explanation: "An adjacency list requires O(V + E) space, whereas an adjacency matrix requires O(V^2), making adjacency lists preferable for sparse graphs."
},

{
  question: "Dijkstra's shortest-path algorithm in its standard form requires which condition for edge weights?",
  options: ["All weights must be equal", "All weights must be non-negative", "All weights must be negative", "Weights must be integers only"],
  answer: 1,
  explanation: "Standard Dijkstra's algorithm assumes non-negative edge weights. Negative edges can invalidate its greedy choice."
},

{
  question: "Which algorithm can find shortest paths from a single source even when some edge weights are negative, provided there is no reachable negative-weight cycle?",
  options: ["Dijkstra's algorithm", "Bellman-Ford algorithm", "Binary search", "Prim's algorithm"],
  answer: 1,
  explanation: "Bellman-Ford supports negative edge weights and can also detect a reachable negative-weight cycle."
},

{
  question: "Which algorithm is commonly used to construct a minimum spanning tree of a connected weighted undirected graph?",
  options: ["Kruskal's algorithm", "Binary search", "Floyd-Warshall only", "Linear search"],
  answer: 0,
  explanation: "Kruskal's algorithm constructs a minimum spanning tree by repeatedly selecting the smallest-weight edge that does not create a cycle."
},

{
  question: "Which OOP concept allows a new class to acquire accessible properties and behaviors from an existing class?",
  options: ["Encapsulation", "Inheritance", "Compilation", "Iteration"],
  answer: 1,
  explanation: "Inheritance allows a derived or child class to acquire and extend accessible members and behavior of a base or parent class."
},

{
  question: "Which OOP principle combines data and the operations that work on that data within a class while controlling access to internal state?",
  options: ["Encapsulation", "Recursion", "Inheritance", "Tokenization"],
  answer: 0,
  explanation: "Encapsulation groups state and behavior together and uses access control to restrict direct access to implementation details."
},

{
  question: "Which statement best describes an abstract class in object-oriented programming?",
  options: ["It must contain only variables", "It is generally intended to serve as a base abstraction and may define abstract operations", "It cannot contain implemented methods", "It is identical to an ordinary object instance"],
  answer: 1,
  explanation: "An abstract class is intended to represent a base abstraction and can define operations that derived classes must implement, while many languages also allow it to contain implemented methods."
},

{
  question: "An array initially contains {8, 3, 6, 1, 5}. After the first complete pass of Bubble Sort in ascending order, what will the array contain?",
  options: ["3, 6, 1, 5, 8", "1, 3, 5, 6, 8", "3, 8, 1, 5, 6", "8, 3, 1, 5, 6"],
  answer: 0,
  explanation: "Bubble Sort compares adjacent elements and swaps out-of-order pairs. During the first complete pass, 8 moves to the final position, producing 3, 6, 1, 5, 8."
},

{
  question: "Which IPv4 address is a valid private address?",
  options: ["8.8.8.8", "172.20.5.4", "193.168.1.1", "200.1.1.1"],
  answer: 1,
  explanation: "Private IPv4 ranges include 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16. Therefore, 172.20.5.4 is private."
},

{
  question: "A database table stores StudentID, StudentName, CourseID, CourseName, and InstructorName repeatedly for every student's enrollment. What is a likely consequence of this unnecessary redundancy?",
  options: ["Faster CPU clock speed", "Automatic encryption", "Update anomalies", "Guaranteed normalization"],
  answer: 2,
  explanation: "Repeated storage of the same facts can cause update anomalies because the same information may need to be changed in several rows. If only some copies are updated, the data can become inconsistent."
},

{
  question: "What is the decimal value of the hexadecimal number 2F?",
  options: ["47", "31", "45", "52"],
  answer: 0,
  explanation: "Hexadecimal 2F equals (2 × 16) + 15 = 32 + 15 = 47."
},

{
  question: "A subnet mask of 255.255.255.0 corresponds to which CIDR prefix length?",
  options: ["/8", "/16", "/24", "/32"],
  answer: 2,
  explanation: "255.255.255.0 contains 24 leading 1 bits, so its CIDR notation is /24."
},

{
  question: "A program compiles and executes normally for most inputs but produces an incorrect result for one valid input. This is best classified as:",
  options: ["A syntax error", "A logic error", "A linker error", "A hardware interrupt"],
  answer: 1,
  explanation: "A logic error occurs when a program executes but its algorithm or conditions cause an incorrect result. Syntax and linker errors generally prevent normal execution."
},

{
  question: "What is the output of the following C code?\n#include <stdio.h>\nint main() {\n    int x = 8;\n    if (x % 3 == 2)\n        x += 4;\n    else\n        x -= 4;\n    printf(\"%d\", x);\n    return 0;\n}",
  options: ["4", "8", "10", "12"],
  answer: 3,
  explanation: "8 % 3 equals 2, so the if condition is true and x becomes 8 + 4 = 12."
},

{
  question: "What is the output of the following C code?\n#include <stdio.h>\nint main() {\n    int a = 1;\n    for (int i = 0; i < 4; i++)\n        a *= 2;\n    printf(\"%d\", a);\n    return 0;\n}",
  options: ["8", "16", "32", "64"],
  answer: 1,
  explanation: "a starts at 1 and is doubled four times: 1 -> 2 -> 4 -> 8 -> 16."
},

{
  question: "What is the output of the following C code?\n#include <stdio.h>\nint main() {\n    int a = 10, b = 3;\n    printf(\"%d\", a % b + a / b);\n    return 0;\n}",
  options: ["3", "4", "5", "6"],
  answer: 1,
  explanation: "Integer division gives 10 / 3 = 3 and 10 % 3 = 1. Therefore, the result is 1 + 3 = 4."
},

{
  question: "What is the output of the following C code?\n#include <stdio.h>\nint main() {\n    int x = 1;\n    while (x < 10)\n        x *= 3;\n    printf(\"%d\", x);\n    return 0;\n}",
  options: ["9", "10", "18", "27"],
  answer: 3,
  explanation: "x takes the values 1, 3, 9, and 27. At 27 the condition x < 10 is false, so 27 is printed."
},

{
  question: "Which SQL query correctly returns the names of students whose marks are at least 80?",
  options: [
    "SELECT name FROM Student WHERE marks >= 80;",
    "SELECT name WHERE marks >= 80 FROM Student;",
    "SELECT Student FROM name IF marks >= 80;",
    "GET name FROM Student HAVING marks >= 80;"
  ],
  answer: 0,
  explanation: "The correct SQL clause order is SELECT columns FROM table WHERE condition. Therefore, SELECT name FROM Student WHERE marks >= 80; is correct."
},

{
  question: "Consider the recursive function f(n): if n == 0 return 1; otherwise return n * f(n - 1). What is f(5)?",
  options: ["25", "60", "120", "720"],
  answer: 2,
  explanation: "The function computes factorial. Therefore, f(5) = 5 * 4 * 3 * 2 * 1 = 120."
},

{
  question: "A recursive function calls itself with n/2 until n becomes 1 and performs constant work per call. What is its time complexity?",
  options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
  answer: 1,
  explanation: "The input is halved on every recursive call, so there are approximately log2(n) calls. With constant work per call, the total time is O(log n)."
},

{
  question: "What is the output of the following Python code?\nx = 10\ndef change(x):\n    x = 20\nchange(x)\nprint(x)",
  options: ["10", "20", "30", "Error"],
  answer: 0,
  explanation: "The parameter x inside change is a local name. Rebinding it to 20 does not rebind the global x, so the printed value remains 10."
},

{
  question: "What is the output of the following Python code?\na = [1, 2, 3, 4]\nprint(a[::-1])",
  options: ["[1, 2, 3, 4]", "[4, 3, 2, 1]", "[2, 3, 4]", "[4, 2]"],
  answer: 1,
  explanation: "A slice with a step of -1 traverses the sequence backward, producing [4, 3, 2, 1]."
},

{
  question: "What is the output of the following Python code?\nx = {1, 2, 2, 3, 3, 3}\nprint(len(x))",
  options: ["3", "4", "5", "6"],
  answer: 0,
  explanation: "A set stores unique elements. The resulting set is {1, 2, 3}, whose length is 3."
},

{
  question: "What is the output of the following Python code?\nx = [i * i for i in range(4)]\nprint(x)",
  options: ["[1, 4, 9, 16]", "[0, 1, 4, 9]", "[0, 1, 2, 3]", "[0, 2, 4, 6]"],
  answer: 1,
  explanation: "range(4) produces 0, 1, 2, and 3. Squaring each value gives [0, 1, 4, 9]."
},

{
  question: "A table Student(StudentID, Name, Email) uses StudentID as its primary key. Which insertion must be rejected if StudentID 105 already exists?",
  options: ["A row with a different StudentID but the same Name", "A row with StudentID 106", "A row with a different StudentID and Email", "Another row with StudentID 105"],
  answer: 3,
  explanation: "Primary-key values must be unique. Since StudentID 105 already exists, another row with StudentID 105 must be rejected."
},

{
  question: "What is the worst-case time complexity of Selection Sort?",
  options: ["O(log n)", "O(n)", "O(n log n)", "O(n^2)"],
  answer: 3,
  explanation: "Selection Sort repeatedly scans the remaining unsorted elements. The total number of comparisons is proportional to n(n - 1)/2, giving O(n^2)."
},

{
  question: "Which SQL operation changes values in existing rows without creating a new row?",
  options: ["INSERT", "UPDATE", "CREATE", "SELECT"],
  answer: 1,
  explanation: "UPDATE modifies values in existing rows. INSERT creates new rows, CREATE defines database objects, and SELECT retrieves data."
},

{
  question: "Which algorithm design technique stores solutions to overlapping subproblems so that they do not have to be recomputed?",
  options: ["Brute force", "Dynamic Programming", "Divide and Conquer only", "Linear scanning"],
  answer: 1,
  explanation: "Dynamic Programming solves overlapping subproblems and stores their results using techniques such as memoization or tabulation."
},

{
  question: "Which statement best describes a greedy algorithm?",
  options: ["It always explores every possible solution", "It makes a locally optimal choice at each step", "It always uses recursion", "It stores every subproblem result"],
  answer: 1,
  explanation: "A greedy algorithm builds a solution by repeatedly making a locally optimal choice. This leads to a globally optimal solution only for problems with the required greedy-choice properties."
},

{
  question: "What is the load factor of a hash table containing 60 stored entries and 100 available slots?",
  options: ["0.4", "0.6", "1.0", "1.67"],
  answer: 1,
  explanation: "Load factor is typically defined as number of stored entries divided by the number of table slots. Thus, 60 / 100 = 0.6."
},

{
  question: "Which technique resolves hash collisions by storing multiple colliding keys in a bucket or linked structure associated with the same table index?",
  options: ["Binary search", "Separate chaining", "Tree traversal", "Selection"],
  answer: 1,
  explanation: "Separate chaining associates each table position with a collection, traditionally a linked list, containing keys that hash to that position."
},

{
  question: "A stack initially contains, from bottom to top, 2, 4, 6. After push(8), pop(), and push(10), which value is at the top?",
  options: ["6", "8", "10", "2"],
  answer: 2,
  explanation: "push(8) places 8 on top, pop() removes 8, and push(10) then places 10 on top."
},

{
  question: "A queue initially contains, from front to rear, A, B, C. After dequeue(), enqueue(D), and dequeue(), which element is now at the front?",
  options: ["A", "B", "C", "D"],
  answer: 2,
  explanation: "The first dequeue removes A, leaving B, C. Enqueue(D) gives B, C, D. The second dequeue removes B, leaving C at the front."
},

{
  question: "Which traversal of a binary tree visits the root before both of its subtrees?",
  options: ["Inorder", "Preorder", "Postorder", "Reverse inorder"],
  answer: 1,
  explanation: "Preorder traversal follows Root -> Left -> Right, so the root is visited before either subtree."
},

{
  question: "Which traversal of a binary tree visits the root after both of its subtrees?",
  options: ["Preorder", "Inorder", "Postorder", "Level-order"],
  answer: 2,
  explanation: "Postorder traversal follows Left -> Right -> Root, so the root is processed after both subtrees."
},

{
  question: "Which of the following is equivalent to A OR (A AND B)?",
  options: ["A", "B", "A AND B", "A XOR B"],
  answer: 0,
  explanation: "By the Boolean absorption law, A OR (A AND B) simplifies directly to A."
},

{
  question: "Which Boolean expression is equivalent to NOT(A OR B)?",
  options: ["(NOT A) OR (NOT B)", "(NOT A) AND (NOT B)", "A AND B", "A XOR B"],
  answer: 1,
  explanation: "By De Morgan's law, NOT(A OR B) = (NOT A) AND (NOT B)."
},

{
  question: "A full adder differs from a half-adder because a full adder:",
  options: ["Has no carry output", "Can accept a carry input in addition to two operand bits", "Can add only one bit", "Uses no logic gates"],
  answer: 1,
  explanation: "A full adder accepts three input bits: two operand bits and a carry-in. It produces a sum and carry-out."
},

{
  question: "Which circuit selects one of several input signals and forwards the selected input to a single output?",
  options: ["Decoder", "Multiplexer", "Adder", "Register"],
  answer: 1,
  explanation: "A multiplexer, or MUX, uses selection lines to choose one of multiple inputs and route it to a single output."
},

{
  question: "How many distinct values can be represented by an unsigned 8-bit binary number?",
  options: ["128", "255", "256", "512"],
  answer: 2,
  explanation: "Eight bits can form 2^8 = 256 distinct bit patterns, representing unsigned values from 0 through 255."
},

{
  question: "What is the largest unsigned decimal value that can be represented using 10 bits?",
  options: ["511", "1023", "1024", "2047"],
  answer: 1,
  explanation: "The maximum unsigned value representable with n bits is 2^n - 1. For 10 bits, this is 1024 - 1 = 1023."
},

{
  question: "Which protocol is normally used to securely access web pages over an encrypted connection?",
  options: ["HTTP", "HTTPS", "FTP", "DHCP"],
  answer: 1,
  explanation: "HTTPS is HTTP carried over TLS, providing encryption and server authentication for web communication."
},

{
  question: "Which protocol is primarily used to send email from a mail client to a mail server or between mail servers?",
  options: ["SMTP", "DNS", "ARP", "ICMP"],
  answer: 0,
  explanation: "SMTP, the Simple Mail Transfer Protocol, is used for sending and relaying email."
},

{
  question: "Which SQL query correctly returns the highest value in the salary column of an Employee table?",
  options: ["SELECT TOP(salary) FROM Employee;", "SELECT MAX(salary) FROM Employee;", "SELECT HIGH(salary) FROM Employee;", "SELECT salary(MAX) FROM Employee;"],
  answer: 1,
  explanation: "MAX is the standard SQL aggregate function for finding the maximum non-NULL value of an expression, so SELECT MAX(salary) FROM Employee is correct."
},

{
  question: "What is the output of the following C code?\n#include <stdio.h>\nint main() {\n    int x = 5, y = 2;\n    double z = (double)x / y;\n    printf(\"%.1f\", z);\n    return 0;\n}",
  options: ["2.0", "2.5", "3.0", "5.2"],
  answer: 1,
  explanation: "Casting x to double causes floating-point division. Therefore, 5.0 / 2 evaluates to 2.5."
},

{
  question: "What is the output of the following C code?\n#include <stdio.h>\nint main() {\n    int x = 12;\n    printf(\"%d\", (x > 10) ? x - 2 : x + 2);\n    return 0;\n}",
  options: ["10", "12", "14", "24"],
  answer: 0,
  explanation: "The condition x > 10 is true, so the first expression x - 2 is selected. Thus, 12 - 2 = 10."
},

{
  question: "What is the output of the following C code?\n#include <stdio.h>\nint main() {\n    int count = 0;\n    for (int i = 1; i <= 3; i++)\n        for (int j = 1; j <= 2; j++)\n            count++;\n    printf(\"%d\", count);\n    return 0;\n}",
  options: ["3", "5", "6", "9"],
  answer: 2,
  explanation: "The outer loop executes 3 times and the inner loop executes 2 times for each outer iteration. Therefore, count is incremented 3 * 2 = 6 times."
},

{
  question: "What is the output of the following C code?\n#include <stdio.h>\nint main() {\n    int x = 6;\n    printf(\"%d\", x & 3);\n    return 0;\n}",
  options: ["0", "2", "3", "6"],
  answer: 1,
  explanation: "6 is 110 in binary and 3 is 011. Bitwise AND gives 010, which equals decimal 2."
},

{
  question: "What is the output of the following C code?\n#include <stdio.h>\nint main() {\n    int x = 5;\n    printf(\"%d\", x | 2);\n    return 0;\n}",
  options: ["2", "5", "7", "10"],
  answer: 2,
  explanation: "5 is 101 in binary and 2 is 010. Bitwise OR gives 111, which is decimal 7."
},

{
  question: "What is the output of the following Python code?\nx = [2, 4, 6, 8]\nprint(sum(x[1:3]))",
  options: ["6", "10", "14", "20"],
  answer: 1,
  explanation: "x[1:3] contains the elements at indices 1 and 2: [4, 6]. Their sum is 10."
},

{
  question: "What is the output of the following Python code?\nd = {\"a\": 2, \"b\": 5}\nd[\"a\"] += d[\"b\"]\nprint(d[\"a\"])",
  options: ["2", "5", "7", "10"],
  answer: 2,
  explanation: "d['a'] initially equals 2 and d['b'] equals 5. The augmented assignment changes d['a'] to 2 + 5 = 7."
},

{
  question: "What is the output of the following Python code?\ndef f(n):\n    if n <= 1:\n        return n\n    return f(n - 1) + f(n - 2)\nprint(f(5))",
  options: ["3", "5", "8", "13"],
  answer: 1,
  explanation: "The function computes Fibonacci numbers with f(0)=0 and f(1)=1. Thus f(5)=5."
},

{
  question: "For the recurrence T(n) = 2T(n/2) + O(n), what is the asymptotic time complexity?",
  options: ["O(log n)", "O(n)", "O(n log n)", "O(n^2)"],
  answer: 2,
  explanation: "There are log n levels of recursion, and the total work across each level is O(n). Therefore, the total complexity is O(n log n)."
},

{
  question: "An algorithm contains two consecutive loops, each running n times and performing O(1) work per iteration. What is the total time complexity?",
  options: ["O(1)", "O(n)", "O(n^2)", "O(2^n)"],
  answer: 1,
  explanation: "The loops are consecutive rather than nested. Their costs add: O(n) + O(n) = O(2n), which simplifies to O(n)."
},

{
  question: "An algorithm contains one loop of n iterations inside another loop of n iterations. If the inner body takes O(1) time, what is the overall time complexity?",
  options: ["O(log n)", "O(n)", "O(n log n)", "O(n^2)"],
  answer: 3,
  explanation: "The inner loop executes n times for each of n outer iterations, producing n * n = n^2 constant-time operations."
},

{
  question: "If binary search begins with 128 sorted elements, what is the maximum number of times the search interval can be halved before only one element remains?",
  options: ["6", "7", "8", "128"],
  answer: 1,
  explanation: "128 = 2^7. Halving 128 seven times produces 64, 32, 16, 8, 4, 2, and finally 1."
},

{
  question: "A Binary Search Tree is created by inserting the keys 50, 30, 70, 20, 40 in that order. What is the left child of 50?",
  options: ["20", "30", "40", "70"],
  answer: 1,
  explanation: "30 is the first key smaller than 50, so it becomes the left child of the root 50. Later values 20 and 40 are inserted beneath 30."
},

{
  question: "A Binary Search Tree is created by inserting 40, 20, 60, 10, 30, 50, 70. What is its inorder traversal?",
  options: ["40, 20, 10, 30, 60, 50, 70", "10, 20, 30, 40, 50, 60, 70", "10, 30, 20, 50, 70, 60, 40", "40, 60, 70, 50, 20, 30, 10"],
  answer: 1,
  explanation: "Inorder traversal of a BST visits keys in ascending order. The sequence is therefore 10, 20, 30, 40, 50, 60, 70."
},

{
  question: "What is the minimum possible height in edges of a binary tree containing 15 nodes?",
  options: ["2", "3", "4", "14"],
  answer: 1,
  explanation: "A binary tree of height h in edges can contain at most 2^(h+1) - 1 nodes. With h = 3, the maximum is 15, so the minimum possible height for 15 nodes is 3."
},

{
  question: "Which operation on a binary min-heap removes the smallest element?",
  options: ["Remove an arbitrary leaf", "Remove the root and restore the heap property", "Remove the rightmost internal node", "Remove the largest child of the root"],
  answer: 1,
  explanation: "The root of a min-heap contains the minimum key. Removing the minimum therefore removes the root and then restores the heap property."
},

{
  question: "If a connected undirected graph has V vertices and exactly V - 1 edges, what must be true?",
  options: ["It is a tree", "It must contain a cycle", "It is a complete graph", "Every vertex has degree 2"],
  answer: 0,
  explanation: "A connected undirected graph with V vertices and V - 1 edges is a tree."
},

{
  question: "What is the maximum number of edges in a simple undirected graph with 6 vertices?",
  options: ["6", "12", "15", "30"],
  answer: 2,
  explanation: "A simple undirected graph can contain at most V(V - 1)/2 edges. For V = 6, this is 6 * 5 / 2 = 15."
},

{
  question: "Which technique is commonly used to detect a cycle while applying Kruskal's minimum-spanning-tree algorithm efficiently?",
  options: ["Stack only", "Disjoint Set Union (Union-Find)", "Binary search", "FIFO queue"],
  answer: 1,
  explanation: "Kruskal's algorithm commonly uses a Disjoint Set Union structure to determine whether two vertices are already in the same connected component before adding an edge."
},

{
  question: "Which IPv4 address belongs to the loopback range?",
  options: ["10.0.0.1", "127.0.0.1", "169.254.1.1", "192.168.1.1"],
  answer: 1,
  explanation: "IPv4 addresses in 127.0.0.0/8 are reserved for loopback. 127.0.0.1 is the most commonly used loopback address."
},

{
  question: "How many total IPv4 addresses are contained in a /26 subnet?",
  options: ["32", "64", "126", "256"],
  answer: 1,
  explanation: "A /26 prefix leaves 32 - 26 = 6 host bits. Therefore, the subnet contains 2^6 = 64 total addresses."
},

{
  question: "How many usable host addresses are available in a traditional IPv4 /27 subnet?",
  options: ["14", "30", "32", "62"],
  answer: 1,
  explanation: "A /27 subnet has 5 host bits, giving 2^5 = 32 total addresses. Traditionally, one network address and one broadcast address are unavailable to hosts, leaving 30 usable addresses."
},

{
  question: "Which protocol is used to map an IPv4 address to a MAC address on a local IPv4 network?",
  options: ["ARP", "SMTP", "HTTP", "FTP"],
  answer: 0,
  explanation: "ARP, the Address Resolution Protocol, resolves an IPv4 address to the corresponding link-layer MAC address on a local network."
},

{
  question: "Which device primarily forwards packets between different IP networks?",
  options: ["Layer 2 switch", "Router", "Hub", "Repeater"],
  answer: 1,
  explanation: "A router examines network-layer addressing and forwards packets between different IP networks."
},

{
  question: "Which operating-system mechanism allows several processes to appear to execute concurrently on a single CPU by rapidly switching among them?",
  options: ["Caching", "Time sharing", "Fragmentation", "Spooling only"],
  answer: 1,
  explanation: "Time sharing divides processor time among runnable processes, allowing them to make progress concurrently from the user's perspective."
},

{
  question: "Which scheduling algorithm executes processes in the order in which they enter the ready queue and is normally non-preemptive?",
  options: ["FCFS", "Round Robin", "Shortest Remaining Time First", "Preemptive Priority"],
  answer: 0,
  explanation: "First-Come, First-Served schedules processes according to arrival order and is normally implemented as a non-preemptive algorithm."
},

{
  question: "A system has three processes with CPU burst times 4, 8, and 2 ms, all available at time 0. Under non-preemptive Shortest Job First, which process runs first?",
  options: ["The 4 ms process", "The 8 ms process", "The 2 ms process", "The choice must be random"],
  answer: 2,
  explanation: "Non-preemptive SJF selects the available process with the shortest CPU burst. Among 4, 8, and 2 ms, the 2 ms process is selected first."
},

{
  question: "Which database anomaly can occur when the same fact is stored redundantly in multiple rows and changing only some copies creates inconsistent data?",
  options: ["Update anomaly", "Compilation anomaly", "Routing anomaly", "Cache anomaly"],
  answer: 0,
  explanation: "An update anomaly occurs when redundant copies of the same information must be changed in multiple places and some copies are not updated consistently."
},

{
  question: "Suppose Student(StudentID, Name, DeptID) has StudentID as its primary key. Which functional dependency must hold?",
  options: ["Name -> StudentID", "DeptID -> StudentID", "StudentID -> Name, DeptID", "Name -> DeptID in every valid design"],
  answer: 2,
  explanation: "A primary key uniquely identifies each tuple. Therefore, StudentID functionally determines the other attributes in the relation, including Name and DeptID."
},

{
  question: "Which SQL query returns departments whose employee count is greater than 5?",
  options: [
    "SELECT department FROM Employee WHERE COUNT(*) > 5 GROUP BY department;",
    "SELECT department FROM Employee GROUP BY department HAVING COUNT(*) > 5;",
    "SELECT department FROM Employee HAVING COUNT(*) > 5 WHERE department;",
    "SELECT COUNT(department) FROM Employee WHERE department > 5;"
  ],
  answer: 1,
  explanation: "Rows are grouped by department and HAVING filters the resulting groups according to the aggregate COUNT(*)."
},

{
  question: "Simplify the Boolean expression (A AND B) OR (A AND NOT B).",
  options: ["A", "B", "A AND B", "A OR B"],
  answer: 0,
  explanation: "Factor A: A AND (B OR NOT B). Since B OR NOT B is 1, the expression simplifies to A."
},

{
  question: "A 4-to-1 multiplexer requires how many select lines?",
  options: ["1", "2", "3", "4"],
  answer: 1,
  explanation: "With n select lines, a multiplexer can select among 2^n inputs. Since 2^2 = 4, a 4-to-1 multiplexer requires 2 select lines."
},
];