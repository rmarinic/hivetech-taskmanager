package com.hivetech.taskmanager.service;

import com.hivetech.taskmanager.model.Task;
import com.hivetech.taskmanager.model.User;
import com.hivetech.taskmanager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public List<Task> findByUser(User user) {
        return taskRepository.findByUser(user);
    }

    public Task save(Task task) {
        return taskRepository.save(task);
    }

    public void delete(long id) {
        taskRepository.deleteById(id);
    }
}
