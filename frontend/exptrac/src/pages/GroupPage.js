import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const GroupPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [group, setGroup] = useState(null);
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const fetchGroup = async () => {
      const response = await axios.get(`/api/groups/${id}`);
      setGroup(response.data);
    };

    fetchGroup();
  }, [id]);

  const handleInvite = async () => {
    try {
      await axios.post('/api/groups/invite', { email, groupId: id });
      alert('Invitation sent!');
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleAddExpense = async () => {
    try {
      await axios.post('/api/groups/expense', {
        description,
        amount,
        paidBy: user._id,
        sharedWith: group.members.map(member => member._id),
        groupId: id,
      });
      alert('Expense added!');
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      {group ? (
        <>
          <h2>{group.name}</h2>
          <h3>Members</h3>
          <ul>
            {group.members.map(member => (
              <li key={member._id}>{member.name}</li>
            ))}
          </ul>
          <h3>Add Member</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <button onClick={handleInvite}>Invite</button>
          <h3>Add Expense</h3>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
          />
          <button onClick={handleAddExpense}>Add Expense</button>
        </>
      ) : (
        <p>Loading group...</p>
      )}
    </div>
  );
};

export default GroupPage;
