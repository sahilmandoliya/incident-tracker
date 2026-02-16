package com.sahil.incidenttracker.backend.seed;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.boot.CommandLineRunner;
import java.time.LocalDateTime;
import java.util.Random;
import java.util.stream.IntStream;

import com.sahil.incidenttracker.backend.repository.IncidentRepository;
import com.sahil.incidenttracker.backend.entity.Incident;
import com.sahil.incidenttracker.backend.enumtype.*;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final IncidentRepository repo;
    private final Random random = new Random();

    @Override
    public void run(String... args) {

        if (repo.count() > 0) return;

        String[] services = {"Auth", "Payment", "Notification", "Analytics", "Database"};
        
        IntStream.range(0, 200).forEach(i -> {
            
            // Random days ago (0-30)
            int daysAgo = random.nextInt(31);
            int hoursAgo = random.nextInt(24);
            LocalDateTime date = LocalDateTime.now().minusDays(daysAgo).minusHours(hoursAgo);

            repo.save(
                    Incident.builder()
                            .title("Incident " + (i + 1) + ": " + getRandomIssue())
                            .service(services[random.nextInt(services.length)])
                            .severity(Severity.values()[random.nextInt(Severity.values().length)])
                            .status(IncidentStatus.values()[random.nextInt(IncidentStatus.values().length)])
                            .owner("engineer" + (random.nextInt(10) + 1) + "@company.com")
                            .summary("Detailed summary for incident " + i + ". This needs investigation.")
                            .createdAt(date)
                            .updatedAt(date)
                            .build()
            );
        });
    }

    private String getRandomIssue() {
        String[] issues = {
            "High Latency", "Connection Timeout", "500 Error", "Data Mismatch", 
            "CPU Spike", "Memory Leak", "Pod Crash", "API Failure"
        };
        return issues[random.nextInt(issues.length)];
    }
}
