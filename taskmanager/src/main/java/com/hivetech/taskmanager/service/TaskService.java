package com.hivetech.taskmanager.service;

import com.hivetech.taskmanager.model.Task;
import com.hivetech.taskmanager.model.User;
import com.hivetech.taskmanager.repository.TaskRepository;
import com.hivetech.taskmanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    public void createTask(Task task, String username) {
        User user = userRepository.findByUsername(username);
        task.setUser(user);
        taskRepository.save(task);
    }

    public List<Task> findByUser(String username) {
        User user = userRepository.findByUsername(username);
        return taskRepository.findByUser(user);
    }

    public Task save(Task task) {
        return taskRepository.save(task);
    }

    public void delete(long id) {
        taskRepository.deleteById(id);
    }
}
