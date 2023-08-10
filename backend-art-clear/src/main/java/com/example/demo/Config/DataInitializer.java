package com.example.demo.Config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Optional;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.demo.entity.Roles;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;



@Component
public class DataInitializer implements CommandLineRunner {

	private final RoleRepository roleRepository;
	private final UserRepository userRepository;

	public DataInitializer(RoleRepository roleRepository, UserRepository userRepository) {
		this.roleRepository = roleRepository;
		this.userRepository = userRepository;
	}

	@Override
	public void run(String... args) throws Exception {
		try (Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/art_clear", "root", "")) {
			try (Statement statement = connection.createStatement()) {
				// Check the current value of max_allowed_packet
				ResultSet resultSet = statement.executeQuery("SHOW VARIABLES LIKE 'max_allowed_packet'");
				if (resultSet.next()) {
					int maxAllowedPacket = resultSet.getInt("Value");
					System.out.println("Current max_allowed_packet value: " + maxAllowedPacket + " bytes");
				} else {
					System.out.println("Failed to retrieve max_allowed_packet value.");
				}

				// Set max_allowed_packet value before executing the query
				statement.executeUpdate("SET GLOBAL max_allowed_packet=157286400");
				System.out.println("max_allowed_packet set successfully.");
			} catch (Exception e) {
				System.out.println("Failed to set max_allowed_packet: " + e.getMessage());
			}
		} catch (Exception e) {
			System.out.println("Failed to establish a database connection: " + e.getMessage());
		}

		// auto generated admin role
		Optional<Roles> existingRole2 = roleRepository.findByName("Admin");
		if (existingRole2.isEmpty()) {
			Roles adminRole2 = new Roles();
			adminRole2.setName("Admin");
			roleRepository.save(adminRole2);

			System.out.println("Data initialization completed: Admin role inserted.");
		} else {
			System.out.println("Data initialization completed: Admin role existing.");
		}
		// auto generated customer role
		Optional<Roles> existingRole1 = roleRepository.findByName("Customer");
		if (existingRole1.isEmpty()) {
			Roles customerRole1 = new Roles();
			customerRole1.setName("Customer");
			roleRepository.save(customerRole1);

			System.out.println("Data initialization completed: Customer role inserted.");
		} else {
			System.out.println("Data initialization completed: Customer role existing.");

		}

		

	}
}

